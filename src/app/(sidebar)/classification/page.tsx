import { ClassificationManagement } from "./components/classification";

export default function Page({}: PageProps) {
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
