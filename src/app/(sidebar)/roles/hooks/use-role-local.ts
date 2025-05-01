import { useState } from "react";
import { Role } from "../types/type";

export function useRoleLocal() {
  const [roles, setRoles] = useState<Role[]>([]);

  // const a = [1,2,3]
  // ...a => 1,2,3
  // [...a] => [1,2,3]
  // const b = {prop: "1", prop2: "2"}
  // ...b => prop: "1", prop2: "2"
  // {...b} => {prop: "1", prop2: "2"}

  function addRole(role: Role) {
    setRoles([...roles, role]);
  }

  function deleteRole(id: number) {
    setRoles(roles.filter((role) => role.id != id));
  }

  function updateRole(updatedRole: Role) {
    roles.map((role) => {
      return role.id == updatedRole.id ? updatedRole : role;
    });
  }

  return {
    roles,
    addRole,
    deleteRole,
    updateRole,
  };
}
