import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";
import { UserProvider } from "./users/context/user-provider";
import { getUserConnected } from "./users/get-user-connected";

export default function Layout({ children }: LayoutProps) {
  let userConnected = getUserConnected();
  return (
    <>
      <UserProvider user={userConnected.user}>
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
