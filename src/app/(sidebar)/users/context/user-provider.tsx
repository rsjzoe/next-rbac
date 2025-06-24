"use client";

import { PropsWithChildren } from "react";
import { UserContext } from "./user-context";
import { User } from "../user-type";

export function UserProvider({ children, user }: UserProviderProps) {
  return (
    <>
      <UserContext.Provider
        value={{
          user,
          hasAccess(serviceName, action) {
            if (!user) {
              return false;
            }
            for (const permisssion of user.role.permissions) {
              if (permisssion.service.name == serviceName) {
                // if (action == "canCreate") {
                //   return permisssion["canCreate"];
                // }
                // permission["canCreate"] , permission["canRead"] , permission["canUpdate"] , permission["canDelete"]
                return permisssion[action];
              }
            }
            return false;
          },
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
}

type UserProviderProps = PropsWithChildren<{ user: User | null }>;
