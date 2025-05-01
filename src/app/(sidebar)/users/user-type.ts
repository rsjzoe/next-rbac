import { Role } from "../roles/types/type";

export type User = {
  id: number;
  userName: string;
  role: Role;
};

export type CreateUser = {
  userName: string;
  roleName: string;
};

export type UpdateUser = {
  userName?: string;
  role?: string;
};
