import dotenv from 'dotenv';

dotenv.config();

const {PORT, MONGO_DB_URI, JWT_SECRET} = process.env;

export {PORT, MONGO_DB_URI, JWT_SECRET};
