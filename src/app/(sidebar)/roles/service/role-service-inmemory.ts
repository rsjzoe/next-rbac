import { ServiceDataService } from "../../service-data/service-data-service";
import { CreateRole, Permission, Role, UpdateRole } from "../types/type";
import { RoleService } from "./role-service";

export class RoleServiceInMemory implements RoleService {
  private roles: Role[] = [];

  constructor(private serviceData: ServiceDataService) {}

  addRole = async (role: CreateRole) => {
    const permissions: Permission[] = [];
    for (const permission of role.permissions) {
      const service = await this.serviceData.findServiceById(
        permission.serviceId
      );
      permissions.push({
        id: Date.now(),
        canCreate: permission.canCreate,
        canRead: permission.canRead,
        canUpdate: permission.canUpdate,
        canDelete: permission.canDelete,
        service: {
          id: permission.serviceId,
          name: service.name,
        },
      });
    }
    const newRole: Role = {
      id: Date.now(),
      roleName: role.roleName,
      permissions: permissions,
    };
    this.roles.push(newRole);

    return newRole;
  };

  delete = async (id: number) => {
    const newRoles: Role[] = [];
    let roleToDelete: Role | null = null;

    for (const role of this.roles) {
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
    const permissions: Permission[] = [];
    for (const permission of updatedRole.permissions) {
      const service = await this.serviceData.findServiceById(
        permission.serviceId
      );
      permissions.push({
        id: Date.now(),
        canCreate: permission.canCreate,
        canRead: permission.canRead,
        canUpdate: permission.canUpdate,
        canDelete: permission.canDelete,
        service: {
          id: permission.serviceId,
          name: service.name,
        },
      });
    }
    for (const role of this.roles) {
      if (role.id == id) {
        role.permissions = permissions;
        return role;
      }
    }
    throw new Error(`Role with ID ${id} not found`);
  };
}
