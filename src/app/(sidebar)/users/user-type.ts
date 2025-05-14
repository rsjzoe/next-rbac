import { Role } from "../roles/types/type";

export type User = {
  id: number;
  name: string | null;
  email: string;
  password: string | null;
  role: Role;
};

export type CreateUser = {
  name: string;
  email: string;
  password: string;
  roleName: string;
};

export type UpdateUser = {
  name: string;
  email: string;
  role?: string;
};
