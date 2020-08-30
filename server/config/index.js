import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  MONGO_DB_URI,
  JWT_SECRET,
  MNEMONIC,
  INFURA_PROJECT_ID,
} = process.env;

export {PORT, MONGO_DB_URI, JWT_SECRET, MNEMONIC, INFURA_PROJECT_ID};
