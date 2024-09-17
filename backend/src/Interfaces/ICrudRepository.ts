export default interface ICrudRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, data: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}
