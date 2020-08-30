import jwt from 'jsonwebtoken';
import ipfsClient from 'ipfs-http-client';
import {JWT_SECRET} from '../config';
import {
  bufferToHex,
  ecrecover,
  fromRpcSig,
  fromUtf8,
  keccak,
  pubToAddress,
} from 'ethereumjs-util';

const getToken = (user) =>
  jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: 86400});

const getTokenFromRequest = (req) => req.headers['authorization'].split(' ')[1];

const uploadFile = async (base64) => {
  const ipfs = ipfsClient('https://ipfs.infura.io:5001/api/v0');

  const buffer = Buffer.from(base64, 'base64');

  return await ipfs.add({path: Math.random(), content: buffer});
};

const validateSignature = (signature, message) => {
  const {v, r, s} = fromRpcSig(signature);
  const hexEthMessage = fromUtf8(
    '\x19Ethereum Signed Message:\n' + message.length + message,
  );
  const messageHash = keccak(hexEthMessage);
  const publicKey = ecrecover(messageHash, v, r, s);

  return bufferToHex(pubToAddress(publicKey));
};

export {getToken, getTokenFromRequest, uploadFile, validateSignature};
