import { createContext } from "react";
import { User } from "../user-type";
import { ActionType, ServiceName } from "../../roles/types/type";

export const UserContext = createContext<UserConnected>({} as UserConnected);

export type UserConnected = {
  user: User | null;
  hasAccess: (serviceName: ServiceName, action: ActionType) => boolean;
};
