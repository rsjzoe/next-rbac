"use client";

import { FolderKanban, LogOut, ShieldCheck, Users } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ServiceName } from "@/app/(sidebar)/roles/types/type";
import Link from "next/link";

type SidebarItem = {
  name: string;
  icon: React.ElementType;
  path: string;
  service?: ServiceName;
};
export function AppSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    // Ici, vous pourriez implémenter la logique de déconnexion
    console.log("Déconnexion");
    // router.push("/login")
  };

  const mainItems: SidebarItem[] = [
    {
      name: "Utilisateurs",
      icon: Users,
      path: "/users",
      service: "utilisateurs",
    },
    { name: "Rôles", icon: ShieldCheck, path: "/roles", service: "roles" },
    {
      name: "Classification",
      icon: FolderKanban,
      path: "/classification",
      service: "classification",
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex h-14 items-center border-b px-4 group-data-[collapsible=icon]:justify-center">
          <SidebarTrigger className="group-data-[collapsible=icon]:ml-0" />
          <span className="ml-2 font-semibold group-data-[collapsible=icon]:hidden">
            Administration
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {mainItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.path}
                tooltip={item.name}
              >
                <Link href={item.path}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start group-data-[collapsible=icon]:justify-center"
                  >
                    <item.icon className="mr-2 h-4 w-4 group-data-[collapsible=icon]:mr-0" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.name}
                    </span>
                  </Button>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-center bg-primary text-white group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:aspect-square"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4 group-data-[collapsible=icon]:mr-0" />
                <span className="group-data-[collapsible=icon]:hidden">
                  Déconnexion
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="group-data-[state=expanded]:hidden"
            >
              Déconnexion
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
