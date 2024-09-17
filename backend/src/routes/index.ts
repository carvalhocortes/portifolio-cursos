import * as express from 'express';
import usersRouter from './UsersRouter';
import loginRouter from './LoginRouter';

const router = (app: express.Router) => {
  app.use('/users', usersRouter);
  app.use('/login', loginRouter);
};

export default router;
