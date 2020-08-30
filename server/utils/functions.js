import jwt from 'jsonwebtoken';
import ipfsClient from 'ipfs-http-client';
import {JWT_SECRET} from '../config';

const getToken = (user) =>
  jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: 86400});

const getTokenFromRequest = (req) => req.headers['authorization'].split(' ')[1];

const uploadFile = async (base64) => {
  const ipfs = ipfsClient('https://ipfs.infura.io:5001/api/v0');

  const buffer = Buffer.from(base64, 'base64');

  return await ipfs.add({path: Math.random(), content: buffer});
};

export {getToken, getTokenFromRequest, uploadFile};
