"use server";

import { roleService } from "./service/service";
import { CreateRole, UpdateRole } from "./types/type";

export async function addRole(role: CreateRole) {
  let newRole = await roleService.addRole(role);
  return newRole;
}

export async function deleteRole(id: number) {
  let deletedRole = await roleService.delete(id);
  return deletedRole;
}

export async function updateRole(id: number, updatedRole: UpdateRole) {
  let role = await roleService.updateRoleById(id, updatedRole);
  return role;
}
