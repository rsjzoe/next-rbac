"use client";

import { PropsWithChildren } from "react";
import { UserContext } from "./user-context";
import { User } from "../user-type";

export function UserProvider({ children }: UserProviderProps) {
  let user: User = {
    userName: "rak",
    id: 1,
    role: {
      id: 1,
      roleName: "admin",
      permissions: [
        {
          id: 1,
          canUpdate: true,
          canDelete: true,
          canRead: true,
          canCreate: true,
          service: {
            id: 1,
            name: "roles",
          },
        },
      ],
    },
  };
  return (
    <>
      <UserContext.Provider
        value={{
          user,
          hasAccess(serviceName, action) {
            for (let permisssion of user.role.permissions) {
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

type UserProviderProps = PropsWithChildren<{}>;
