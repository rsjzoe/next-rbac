import { roleService } from "../../roles/service/service";
import { UserService } from "./user-service";
import { UserServiceInMemory } from "./user-service-in-memory";
import { UserServicePrisma } from "./user-service-prisma";

export const userService: UserService = new UserServicePrisma(roleService);
