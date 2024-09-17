import errorMessages from '../common/errorMessages';
import UsersEntity from '../entities/UsersEntity';
import EnumProfiles from '../enums/EnumProfiles';
import IUserRepository from '../Interfaces/IUserRepository';
import { CreateUserPayload, UpdateUserPayload, User, UserResponse } from '../types/userTypes';
import * as utils from '../utils';

export default class UsersService {
  private usersRepository: IUserRepository;

  constructor(usersRepository: IUserRepository) {
    this.usersRepository = usersRepository;
  }

  findById = async (id: string): Promise<UserResponse> => {
    const user = await this.findValidUser(id);
    return this.assembleUserResponse(user);
  }

  findAll = async (): Promise<UserResponse[]> => {
    const users = await this.usersRepository.findAll();
    return users.map(user => this.assembleUserResponse(user));

  }

  create = async (createUserPayload: CreateUserPayload): Promise<UserResponse> => {
    const user = await this.usersRepository.findByEmail(createUserPayload.email)
    if (user) throw errorMessages.alreadyExists('usuário')
    const password = utils.generateRandomPassword()
    await utils.sendPasswordByEmail(createUserPayload.email, password)
    const hashedPassword = utils.hashPassword(password)
    const savedUser = await this.usersRepository.create({ ...createUserPayload, profile: EnumProfiles.writer, password: hashedPassword })
    return this.assembleUserResponse(savedUser)
  }

  update = async (id: string, { name, email, password }: UpdateUserPayload): Promise<UserResponse> => {
    await this.findValidUser(id);
    if (password) password = utils.hashPassword(password);
    await this.usersRepository.update(id, { name, email, password });
    const updatedUser = await this.findValidUser(id);
    return this.assembleUserResponse(updatedUser);
  }

  delete = async (id: string): Promise<void> => {
    await this.findValidUser(id);
    return this.usersRepository.delete(id);
  }

  login = async (email: string, password: string): Promise<UserResponse> => {
    const user = await this.usersRepository.findByEmail(email);
    if (!user || user.password !== utils.hashPassword(password)) throw errorMessages.invalidPassword();
    return this.assembleUserResponse(user); //generate token here
  }

  private findValidUser = async (id: string): Promise<UsersEntity> => {
    const user = await this.usersRepository.findById(id);
    if (!user) throw errorMessages.notRegistered('usuário');
    return user;
  }

  private assembleUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profile,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
