"use server";

import { revalidatePath } from "next/cache";
import { userService } from "./service/service";
import { CreateUser, UpdateUser } from "./user-type";

export async function addUser(user: CreateUser) {
  const newUser = await userService.addUser(user);
  revalidatePath("/users");
  return newUser;
}

export async function deleteUser(id: string) {
  const deletedUser = await userService.delete(id);
  revalidatePath("/users");
  return deletedUser;
}

export async function updateUser(id: string, updatedUser: UpdateUser) {
  const user = await userService.updateUserById(id, updatedUser);
  revalidatePath("/users");
  return user;
}
