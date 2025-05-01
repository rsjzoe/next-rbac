import { useContext } from "react";
import { UserContext } from "./user-context";

export function useUserConnected() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useUserConnected must be used within a UserProvider");
  }
  return userContext;
}
