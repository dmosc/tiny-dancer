import {Router} from 'express';
import jwt from 'jsonwebtoken';
import {Document} from '../mongo-db/models';
import {getTokenFromRequest, uploadFile} from '../utils/functions';
import {JWT_SECRET} from '../config';

const documents = Router();

documents.post('/new-document', async (req, res) => {
  try {
    const token = getTokenFromRequest(req);
    const {id} = jwt.verify(token, JWT_SECRET);
    const {name, file: base64, signatures} = req.body;

    const {cid} = await uploadFile(base64);

    const hash = cid.toString();
    const url = `https://gateway.ipfs.io/ipfs/${hash}`;

    const document = new Document({
      name,
      hash,
      url,
      owner: id,
      signatures: signatures.map((id) => ({user: id})),
    });

    await document.save();

    res.status(200).json(url);
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

documents.get('/mine', async (req, res) => {
  try {
    const token = getTokenFromRequest(req);
    const {id} = jwt.verify(token, JWT_SECRET);

    const documents = await Document.find({owner: id}).populate(
      'owner signatures.user',
    );

    res.status(200).json(documents);
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

documents.get('/', async (req, res) => {
  try {
    const token = getTokenFromRequest(req);
    const {id} = jwt.verify(token, JWT_SECRET);

    const documents = await Document.find({'signatures.user': id}).populate(
      'owner signatures.user',
    );

    res.status(200).json(documents);
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

export default documents;
