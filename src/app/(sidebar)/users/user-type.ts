export type User = {
  id: number;
  userName: string;
  role: string;
};

export type CreateUser = Omit<User, "id">;

export type UpdateUser = {
  userName?: string;
  role?: string;
};
