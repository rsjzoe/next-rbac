import { RoleService } from "../../roles/service/role-service";
import { CreateUser, UpdateUser, User } from "../user-type";
import { UserService } from "./user-service";

export class UserServiceInMemory implements UserService {
  private users: User[] = [];

  constructor(private roleService: RoleService) {}

  addUser = async (user: CreateUser) => {
    const newUser: User = {
      id: Date.now(),
      userName: user.userName,
      role: await this.roleService.getByName(user.roleName),
    };

    this.users.push(newUser);

    return newUser;
  };

  delete = async (id: number) => {
    const newUsers: User[] = [];
    let userToDelete: User | null = null;

    for (let user of this.users) {
      if (user.id == id) {
        userToDelete = user;
      }
      if (user.id != id) {
        newUsers.push(user);
      }
    }
    if (userToDelete == null) {
      throw new Error("User not found");
    }
    this.users = newUsers;
    return userToDelete;
  };

  listAll = async () => {
    return this.users;
  };

  getById = async (id: number) => {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  };

  getByName = async (name: string) => {
    const user = this.users.find((user) => user.userName === name);
    if (!user) {
      throw new Error(`User with name ${name} not found`);
    }
    return user;
  };

  updateUserById = async (id: number, updatedUser: UpdateUser) => {
    for (let user of this.users) {
      if (user.id == id) {
        if (updatedUser.userName) {
          user.userName = updatedUser.userName;
        }
        if (updatedUser.role) {
          user.role = await this.roleService.getByName(updatedUser.role);
        }
        return user;
      }
    }
    throw new Error(`User with ID ${id} not found`);
  };
}
