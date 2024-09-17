import * as express from 'express';
import UsersRepository from '../repositories/UsersRepository';
import UsersService from '../services/UsersService';
import UsersController from '../controllers/UsersController';
import wrapperFn from '../middlewares/WrapperMiddleware';
import ValidationMiddleware from '../middlewares/ValidatorMiddleware';
import createUserSchema from '../Schemas/createUserSchema';
import updateUserSchema from '../Schemas/updateUserSchema';

const router = express.Router();
const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const { create, update, delete: deleteUser, findAll, findById } = new UsersController(usersService);
const { validate: validateCreate } = new ValidationMiddleware(createUserSchema);
const { validate: validateUpdate } = new ValidationMiddleware(updateUserSchema);


router.post('/', validateCreate, wrapperFn(create, 201));
router.put('/:id', validateUpdate, wrapperFn(update));
router.delete('/:id', wrapperFn(deleteUser));
router.get('/', wrapperFn(findAll));
router.get('/:id', wrapperFn(findById));

export default router;
