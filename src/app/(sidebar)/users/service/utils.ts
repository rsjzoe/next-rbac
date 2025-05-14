import { comparePassword } from "@/lib/password";
import { userService } from "./service";

export async function verifyUser(password: string, email: string) {
  try {
    const user = await userService.getByEmail(email);
    if (await comparePassword(password, user.password || "")) {
      return user;
    }
    return null;
  } catch (error) {
    return null;
  }
}
