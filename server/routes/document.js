import {Router} from 'express';
import {Document} from '../mongo-db/models';

const document = Router();

document.post('/create', async (req, res) => {
  const document = new Document({...req.body});

  await document.save();

  res.status(200).send('Document uploaded successfully');
});

export default document;
