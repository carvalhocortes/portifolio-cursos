// src/interfaces/IUserRepository.ts
import ICrudRepository from './ICrudRepository';
import Users from '../entities/UsersEntity';

export default interface IUserRepository extends ICrudRepository<Users> {
  findByEmail(email: string): Promise<Users | null>;
}
