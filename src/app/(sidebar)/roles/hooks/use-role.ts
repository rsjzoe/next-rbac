import { create } from "zustand";
import { Role } from "../types/type";

interface RoleState {
  roles: Role[];
  addRole: (role: Role) => void;
  setRoles: (roles: Role[]) => void;
  delete: (id: number) => void;
  updateRole: (updatedRole: Role) => void;
}

export const useRole = create<RoleState>((set) => {
  return {
    roles: [],
    addRole: (role: Role) => {
      set((state) => {
        return { roles: [...state.roles, role] };
      });
    },
    setRoles: (roles: Role[]) => {
      set(() => {
        return { roles };
      });
    },
    delete: (id: number) => {
      set((state) => {
        return { roles: state.roles.filter((role) => role.id !== id) };
      });
    },
    updateRole: (updatedRole: Role) => {
      set((state) => {
        const updatedRoles = state.roles.map((role) => {
          return role.id === updatedRole.id ? updatedRole : role;
        });
        return { roles: updatedRoles };
      });
    },
  };
});
