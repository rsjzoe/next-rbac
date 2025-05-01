import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { roleService } from "./service/service";
import Link from "next/link";
import { RoleDelete } from "./components/role-delete";

export default async function RolesPage() {
  const roles = await roleService.listAll();

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestion des Rôles</h1>
        <Link href={"/roles/create"}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Ajouter un rôle
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des rôles</CardTitle>
        </CardHeader>
        <CardContent>
          {roles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucun rôle trouvé. Créez votre premier rôle.
            </div>
          ) : (
            <Table className="border">
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold">Nom du rôle</TableHead>
                  <TableHead className="text-right font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow
                    key={role.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {role.roleName}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/roles/${role.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4 mr-1" />
                            Modifier
                          </Button>
                        </Link>
                        <RoleDelete role={role} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
