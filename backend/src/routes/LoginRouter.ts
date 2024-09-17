import * as express from 'express';
import UsersRepository from '../repositories/UsersRepository';
import UsersService from '../services/UsersService';
import UsersController from '../controllers/UsersController';
import wrapperFn from '../middlewares/WrapperMiddleware';
import ValidationMiddleware from '../middlewares/ValidatorMiddleware';
import loginSchema from '../Schemas/loginSchema';

const router = express.Router();
const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const { login } = new UsersController(usersService);
const { validate: validateLogin } = new ValidationMiddleware(loginSchema);


router.post('/', validateLogin, wrapperFn(login));

export default router;
