import { CreateRole, Role, UpdateRole } from "../types/type";
import { RoleService } from "./role-service";

export class RoleServiceInMemory implements RoleService {
  private roles: Role[] = [];

  addRole = async (role: CreateRole) => {
    const newRole: Role = {
      id: Date.now(),
      roleName: role.roleName,
      permissions: role.permissions.map((permission) => ({
        id: Date.now(),
        canCreate: permission.canCreate,
        canRead: permission.canRead,
        canUpdate: permission.canUpdate,
        canDelete: permission.canDelete,
        service: {
          id: permission.serviceId,
          name: "",
        },
      })),
    };
    this.roles.push(newRole);

    return newRole;
  };

  delete = async (id: number) => {
    const newRoles: Role[] = [];
    let roleToDelete: Role | null = null;

    for (let role of this.roles) {
      if (role.id == id) {
        roleToDelete = role;
      }
      if (role.id != id) {
        newRoles.push(role);
      }
    }
    if (roleToDelete == null) {
      throw new Error("Role not found");
    }
    this.roles = newRoles;
    return roleToDelete;
  };

  listAll = async () => {
    return this.roles;
  };

  getById = async (id: number) => {
    const role = this.roles.find((role) => role.id === id);
    if (!role) {
      throw new Error(`Role with ID ${id} not found`);
    }
    return role;
  };

  getByName = async (name: string) => {
    const role = this.roles.find((role) => role.roleName === name);
    if (!role) {
      throw new Error(`Role with name ${name} not found`);
    }
    return role;
  };

  updateRoleById = async (id: number, updatedRole: UpdateRole) => {
    for (let role of this.roles) {
      if (role.id == id) {
        role.permissions = updatedRole.permissions.map((permission) => ({
          id: Date.now(),
          canCreate: permission.canCreate,
          canRead: permission.canRead,
          canUpdate: permission.canUpdate,
          canDelete: permission.canDelete,
          service: {
            id: permission.serviceId,
            name: "",
          },
        }));
        return role;
      }
    }
    throw new Error(`Role with ID ${id} not found`);
  };
}
