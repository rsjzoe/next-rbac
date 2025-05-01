"use client";

import { PropsWithChildren } from "react";
import { UserConnected, UserContext } from "./user-context";
import { User } from "../user-type";

export function UserProvider({ children, userConnected }: UserProviderProps) {
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
      <UserContext.Provider value={userConnected}>
        {children}
      </UserContext.Provider>
    </>
  );
}

type UserProviderProps = PropsWithChildren<{ userConnected: UserConnected }>;
