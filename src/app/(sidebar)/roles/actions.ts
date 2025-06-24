"use server";

import { revalidatePath } from "next/cache";
import { roleService } from "./service/service";
import { ActionType, CreateRole, ServiceName, UpdateRole } from "./types/type";

export async function addRole(role: CreateRole) {
  const newRole = await roleService.addRole(role);
  return newRole;
}

export async function deleteRole(id: number) {
  const deletedRole = await roleService.delete(id);
  revalidatePath("/roles");
  return deletedRole;
}

export async function updateRole(id: number, updatedRole: UpdateRole) {
  const role = await roleService.updateRoleById(id, updatedRole);
  return role;
}

export async function hasAccess(
  roleName: string,
  action: ActionType,
  serviceName: ServiceName
) {
  const role = await roleService.getByName(roleName);
  for (const permisssion of role.permissions) {
    if (permisssion.service.name == serviceName) {
      // if (action == "canCreate") {
      //   return permisssion["canCreate"];
      // }
      // permission["canCreate"] , permission["canRead"] , permission["canUpdate"] , permission["canDelete"]
      return permisssion[action];
    }
  }
  return false;
}
