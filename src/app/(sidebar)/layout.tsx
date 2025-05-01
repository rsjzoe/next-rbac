import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";
import { UserProvider } from "./users/context/user-provider";
import { User } from "./users/user-type";

export default function Layout({ children }: LayoutProps) {
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
      <UserProvider
        userConnected={{
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
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <div>{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </UserProvider>
    </>
  );
}

type LayoutProps = PropsWithChildren;
