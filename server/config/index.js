import dotenv from 'dotenv';

dotenv.config();

const {API_PORT, MONGO_DB_URI, JWT_SECRET} = process.env;

export {API_PORT, MONGO_DB_URI, JWT_SECRET};
