import { RoleService } from "../../roles/service/role-service";
import { CreateUser, UpdateUser, User } from "../user-type";
import { UserService } from "./user-service";

export class UserServiceInMemory implements UserService {
  private users: User[] = [];

  constructor(private roleService: RoleService) {}

  addUser = async (user: CreateUser): Promise<User> => {
    const newUser: User = {
      id: Date.now().toString(),
      name: user.name,
      email: user.email,
      role: await this.roleService.getByName(user.roleName),
    };

    this.users.push(newUser);

    return newUser;
  };

  delete = async (id: string): Promise<User> => {
    const newUsers: User[] = [];
    let userToDelete: User | null = null;

    for (let user of this.users) {
      if (user.id === id) {
        userToDelete = user;
      } else {
        newUsers.push(user);
      }
    }
    if (userToDelete == null) {
      throw new Error("User not found");
    }
    this.users = newUsers;
    return userToDelete;
  };

  listAll = async (): Promise<User[]> => {
    return this.users;
  };

  getById = async (id: string): Promise<User> => {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  };

  getByName = async (name: string): Promise<User> => {
    const user = this.users.find((user) => user.name === name);
    if (!user) {
      throw new Error(`User with name ${name} not found`);
    }
    return user;
  };

  getByEmail = async (email: string): Promise<User> => {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    return user;
  };

  updateUserById = async (
    id: string,
    updatedUser: UpdateUser
  ): Promise<User> => {
    for (let user of this.users) {
      if (user.id === id) {
        if (updatedUser.name !== undefined) {
          user.name = updatedUser.name;
        }
        if (updatedUser.email !== undefined) {
          user.email = updatedUser.email;
        }
        if (updatedUser.role !== undefined) {
          user.role = await this.roleService.getByName(updatedUser.role);
        }
        return user;
      }
    }
    throw new Error(`User with ID ${id} not found`);
  };
}
