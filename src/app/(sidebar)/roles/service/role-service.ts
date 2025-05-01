import { CreateRole, Role, UpdateRole } from "../types/type";

export interface RoleService {
  addRole(role: CreateRole): Promise<Role>;
  delete(id: number): Promise<Role>;
  listAll(): Promise<Role[]>;
  getById(id: number): Promise<Role>;
  getByName(name: string): Promise<Role>;
  updateRoleById(id: number, updatedRole: UpdateRole): Promise<Role>;
}
