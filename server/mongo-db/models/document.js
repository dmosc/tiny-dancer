import {model, Schema} from 'mongoose';
import softDelete from 'mongoose-delete';
import uniqueValidator from 'mongoose-unique-validator';

const Signature = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  signature: {type: String, required: false},
});

const Document = new Schema({
  name: {type: String, required: true},
  hash: {type: String, required: true},
  url: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  signatures: [{type: Signature, required: true, default: []}],
  transactionHash: {type: String, required: false},
});

Document.plugin(uniqueValidator);
Document.plugin(softDelete, {deletedAt: true});

export default model('Document', Document);
