import { CreateUser, UpdateUser, User } from "../user-type";

export interface UserService {
  addUser(user: CreateUser): Promise<User>;
  delete(id: string): Promise<User>;
  listAll(): Promise<User[]>;
  getById(id: string): Promise<User>;
  getByName(name: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  updateUserById(id: string, updatedUser: UpdateUser): Promise<User>;
}
