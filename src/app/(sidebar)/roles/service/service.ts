import { serviceData } from "../../service-data/service-data";
import { RoleService } from "./role-service";
import { RoleServiceInMemory } from "./role-service-inmemory";

export const roleService: RoleService = new RoleServiceInMemory(serviceData);
