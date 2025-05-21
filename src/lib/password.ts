import bcrypt from "bcrypt";
import { auth } from "./auth";

export async function hashPassword(password: string) {
  const hashedPassword = await (await auth.$context).password.hash(password);
  return hashedPassword;
}

export async function saltAndHashPassword(
  password: string,
  saltRounds: number = 10
): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
