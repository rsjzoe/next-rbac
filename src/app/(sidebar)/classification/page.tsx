import { getUserConnected } from "../users/get-user-connected";
import { ClassificationManagement } from "./components/classification";

export default async function Page({}: PageProps) {
  const { hasAccess } = await getUserConnected();
  if (!hasAccess("classification", "canRead")) {
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
    <>
      <div className="flex flex-col min-h-screen">
        <header className="border-b">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-semibold">
              Gestion des Classifications
            </h1>
          </div>
        </header>
        <main className="flex-1 p-6">
          <ClassificationManagement />
        </main>
      </div>
    </>
  );
}

type PageProps = {};
