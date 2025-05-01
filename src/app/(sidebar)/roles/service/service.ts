import { RoleService } from "./role-service";
import { RoleServiceInMemory } from "./role-service-inmemory";

export const roleService: RoleService = new RoleServiceInMemory();
