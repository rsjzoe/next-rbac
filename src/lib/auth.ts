import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { saltAndHashPassword } from "./password";
import { verifyUser } from "@/app/(sidebar)/users/service/utils";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { object, string } from "zod";
import prisma from "./prisma";

export const signInSchema = object({
  email: string({ required_error: "Email is required" }).min(
    1,
    "Email is required"
  ),

  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(4, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const pwHash = await saltAndHashPassword(password);

          const user = await verifyUser(pwHash, email);

          if (!user) {
            throw new Error("Invalid credentials.");
          }

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            password: user.password,
            image: "",
          };
        } catch (error) {
          throw new Error("Invalid credentials.");
        }
      },
    }),
  ],
});

type Credential = {
  email: string;
  password: string;
};
