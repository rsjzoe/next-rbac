"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { UserManagement } from "./components/user-management";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-xl font-semibold">Gestion des Utilisateurs</h1>
        </div>
      </header>
      <main className="flex-1 p-6">
        <UserManagement />
      </main>
    </div>
  );
}
