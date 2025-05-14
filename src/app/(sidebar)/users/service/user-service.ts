import { CreateUser, UpdateUser, User } from "../user-type";

export interface UserService {
  addUser(user: CreateUser): Promise<User>;
  delete(id: number): Promise<User>;
  listAll(): Promise<User[]>;
  getById(id: number): Promise<User>;
  getByName(name: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  updateUserById(id: number, updatedUser: UpdateUser): Promise<User>;
}
