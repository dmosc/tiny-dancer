import {model, Schema} from 'mongoose';
import softDelete from 'mongoose-delete';
import uniqueValidator from 'mongoose-unique-validator';

const User = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, trim: true, index: true, unique: true, sparse: true},
  email: {type: String, trim: true, index: true, unique: true, sparse: true},
  image: {type: String, required: false},
  signature: {type: String, required: true, unique: true},
  ethAddress: {type: String, required: true, unique: true},
});

User.plugin(uniqueValidator);
User.plugin(softDelete, {deletedAt: true});

export default model('User', User);
