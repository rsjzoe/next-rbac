import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },

  plugins: [nextCookies()],
  databaseHooks: {
    account: {
      create: {
        before(account, context) {
          const withEncryptedTokens = { ...account, role: "user" };

          return Promise.resolve({
            data: withEncryptedTokens,
          });
        },
      },
    },
  },
});
