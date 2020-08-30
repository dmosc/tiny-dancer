import {Router} from 'express';
import users from './users';
import documents from './documents';

const routes = Router();

routes.use('/users', users);
routes.use('/documents', documents);

export default routes;
