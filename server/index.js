import express from 'express';
import mongoose, {Schema} from 'mongoose';
import cookieParser from 'cookie-parser';
import routes from './routes';
import {MONGO_DB_URI, PORT} from './config';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type',
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

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
      app.listen(PORT),
    ]);

    Schema.Types.String.checkRequired((v) => v !== null);

    console.info(`📀 Database listening on: ${MONGO_DB_URI}`);
    console.info(`🚀  Server listening on port ${PORT}`);
  } catch (e) {
    console.error(e);
  }
})();
