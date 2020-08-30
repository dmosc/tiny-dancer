import {Router} from 'express';
import {User} from '../mongo-db/models';
import {
  bufferToHex,
  ecrecover,
  fromRpcSig,
  fromUtf8,
  keccak,
  pubToAddress,
} from 'ethereumjs-util';
import {getToken} from '../utils/functions';

const users = Router();

const validateSignature = (signature) => {
  const {v, r, s} = fromRpcSig(signature);
  const message = 'Elton John';
  const hexEthMessage = fromUtf8(
    '\x19Ethereum Signed Message:\n' + message.length + message,
  );
  const messageHash = keccak(hexEthMessage);
  const publicKey = ecrecover(messageHash, v, r, s);

  return bufferToHex(pubToAddress(publicKey));
};

users.post('/login', async (req, res) => {
  const {signature, ethAddress} = req.body;
  try {
    const user = await User.findOne({ethAddress});

    if (!user) throw new Error('User does not exist!');

    const recoveredAddress = validateSignature(signature);

    if (recoveredAddress.toLowerCase() === ethAddress.toLowerCase()) {
      const token = getToken(user);

      res.status(200).json(token);
    } else {
      throw new Error('Signature does not match the records!');
    }
  } catch (e) {
    res.status(404).send(e.toString());
  }
});

users.post('/register', async (req, res) => {
  try {
    const user = new User({...req.body});

    const recoveredAddress = validateSignature(user.signature);

    if (recoveredAddress.toLowerCase() !== user.ethAddress.toLowerCase()) {
      throw new Error('Signature does not match the records!');
    }

    await user.save();

    const token = getToken(user);

    res.status(200).json(token);
  } catch (e) {
    console.log(e);
    res.status(404).send(e.toString());
  }
});

users.get('/', async (req, res) => {
  const {search} = req.query;
  const regexSearch = new RegExp(search, 'i');

  try {
    const users = await User.find({
      $or: [
        {firstName: regexSearch},
        {lastName: regexSearch},
        {username: regexSearch},
        {email: regexSearch},
      ],
    });

    res.status(200).json(users);
  } catch (e) {
    res.status(404).send(e.toString());
  }
});

export default users;
