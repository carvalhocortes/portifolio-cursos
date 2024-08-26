import { Request, Response } from "express";
import UsersRepository from "../repositories/UsersRepository";

export default class UsersController {
  constructor(private repository: UsersRepository) {}

  private async handleResponse(promise: Promise<any>, res: Response, successStatus = 200) {
    return promise
      .then(data => res.status(successStatus).json(data))
      .catch((error: any) => {
        const statusCode = error.httpCode || 500;
        const message = error.msg || 'Internal Server Error';
        return res.status(statusCode).json({ message });
      });
  }

  async handleLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const loginPromise = this.repository.handleLogin(email, password)
      .then(token => ({ token }));
    return this.handleResponse(loginPromise, res);
  }

  async listAllUsers(req: Request, res: Response) {
    const usersPromise = this.repository.listAllUsers();
    return this.handleResponse(usersPromise, res);
  }

  async newUser(req: Request, res: Response) {
    const newUserPromise = this.repository.newUser(req.body)
      .then(() => ({
        message: 'Novo usuário criado com sucesso, a senha foi enviada para o e-mail cadastrado.',
      }));
    return this.handleResponse(newUserPromise, res, 201);
  }
}
