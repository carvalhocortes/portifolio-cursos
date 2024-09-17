import { Repository } from 'typeorm';
import Users from '../entities/UsersEntity';
import IUserRepository from '../Interfaces/IUserRepository';
import AppDataSource from '../config/dataSource';

export default class UsersRepository implements IUserRepository {
  private usersEntity: Repository<Users>;

  constructor() {
    this.usersEntity = AppDataSource.getRepository(Users);
  }

  create = async (data: Partial<Users>): Promise<Users> => {
    const user = this.usersEntity.create(data);
    await this.usersEntity.save(user);
    return user;
  }

  findById = (id: string): Promise<Users | null> => {
    return this.usersEntity.findOne({ where: { id } });
  }

  findByEmail = (email: string): Promise<Users | null> => {
    return this.usersEntity.findOne({ where: { email } });
  }

  findAll = (): Promise<Users[]> => {
    return this.usersEntity.find();
  }

  update = async (id: string, data: Partial<Users>): Promise<void> => {
    await this.usersEntity.update(id, data);
  }

  delete = async (id: string): Promise<void> => {
    await this.usersEntity.delete(id);
  }
}
