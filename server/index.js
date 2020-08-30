import express from 'express';
import mongoose, {Schema} from 'mongoose';
import cookieParser from 'cookie-parser';
import routes from './routes';
import {MONGO_DB_URI, API_PORT} from './config';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(routes);

(async () => {
  try {
    await Promise.all([
      mongoose.connect(MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
      app.listen(API_PORT),
    ]);

    Schema.Types.String.checkRequired((v) => v !== null);

    console.info(`📀 Database listening on: ${MONGO_DB_URI}`);
    console.info(`🚀  Server listening on port ${API_PORT}`);
  } catch (e) {
    console.error(e);
  }
})();
