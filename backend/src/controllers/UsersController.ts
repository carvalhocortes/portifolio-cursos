import { Request } from 'express';
import UsersService from '../services/UsersService';

export default class UserController {
  private usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  findById = (req: Request) => {
    const { id } = req.params
    return this.usersService.findById(id)
  }

  findAll = async () => {
    return this.usersService.findAll();
  }

  create = (req: Request) => {
    const { name, email } = req.body
    return this.usersService.create({ name, email })
  }

  update = (req: Request) => {
    const { id } = req.params
    const { name, email, password } = req.body
    return this.usersService.update(id, { name, email, password })
  }

  delete = (req: Request) => {
    const { id } = req.params
    return this.usersService.delete(id)
  }

  login = (req: Request) => {
    const { email, password } = req.body
    return this.usersService.login(email, password)
  }
}
