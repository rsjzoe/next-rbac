import { roleService } from "../../roles/service/service";
import { UserService } from "./user-service";
import { UserServiceInMemory } from "./user-service-in-memory";

export const userService: UserService = new UserServiceInMemory(roleService);
