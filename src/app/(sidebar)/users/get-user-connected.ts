import { auth } from "@/lib/auth";
import { UserConnected } from "./context/user-context";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { userService } from "./service/service";

export async function getUserConnected(): Promise<UserConnected> {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session) {
    redirect("/login");
  }
  const user = await userService.getById(session.session.id);

  return {
    user,
    hasAccess(serviceName, action) {
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
  };
}
