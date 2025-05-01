import { createContext } from "react";
import { User } from "../user-type";
import { ActionType, ServiceName } from "../../roles/types/type";

type UserContextType = UserConnected;

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export type UserConnected = {
  user: User | null;
  hasAccess: (serviceName: ServiceName, action: ActionType) => boolean;
};
