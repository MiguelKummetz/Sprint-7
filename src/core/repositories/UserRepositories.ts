import User from '../domain/entieies/User';

export interface UserRepository {
  create(user: User): Promise<void>;
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[] | null>;
  update(user: User): Promise<void>;
  delete(id: number): Promise<void>;
}
