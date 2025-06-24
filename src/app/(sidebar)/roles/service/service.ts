import { RoleService } from "./role-service";
// import { RoleServiceInMemory } from "./role-service-inmemory";
import { RoleServicePrisma } from "./role-service-prisma";

export const roleService: RoleService = new RoleServicePrisma();
