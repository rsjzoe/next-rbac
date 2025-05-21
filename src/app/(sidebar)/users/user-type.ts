import { Role } from "../roles/types/type";

export type User = {
  id: string;
  name: string | null;
  email: string;
  role: Role;
};

export type CreateUser = {
  name: string;
  email: string;
  roleName: string;
};

export type UpdateUser = {
  name: string;
  email: string;
  role?: string;
};
