import { roleService } from "../roles/service/service";
import { UserManagement } from "./components/user-management";
import { getUserConnected } from "./get-user-connected";
import { userService } from "./service/service";

export default async function Page() {
  let users = await userService.listAll();
  let roles = await roleService.listAll();
  const { hasAccess } = getUserConnected();

  if (!hasAccess("utilisateurs", "canRead")) {
    return (
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Accès refusé</h1>
        <p className="text-muted-foreground">
          Vous n'avez pas la permission de voir cette page.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-xl font-semibold">Gestion des Utilisateurs</h1>
        </div>
      </header>
      <main className="flex-1 p-6">
        <UserManagement users={users} roles={roles} />
      </main>
    </div>
  );
}
