import dotenv from 'dotenv';

dotenv.config();

const {PORT: ENVPORT, MONGO_DB_URI, JWT_SECRET} = process.env;

const PORT = ENVPORT || 4000;

export {PORT, MONGO_DB_URI, JWT_SECRET};
