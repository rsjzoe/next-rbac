"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { getRoles, deleteRole } from "@/lib/actions";
import { useRole } from "./hooks/use-role";

export default function RolesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const roles = useRole((state) => state.roles);
  const setRoles = useRole((state) => state.setRoles);
  const router = useRouter();
  // const { addRole, deleteRole, roles, updateRole } = useRoleLocal();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error) {
        toast("Erreur", {
          description: "Impossible de charger les rôles",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteRole(id);
      setRoles(roles.filter((role) => role.id !== id));
      toast("Succès", { description: "Le rôle a été supprimé avec succès" });
    } catch (error) {
      toast("Erreur", {
        description: "Impossible de supprimer le rôle",
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestion des Rôles</h1>
        <Button onClick={() => router.push("/roles/create")}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter un rôle
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des rôles</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : roles.length === 0 ? (
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/roles/${role.id}/edit`)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Supprimer
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Êtes-vous sûr?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action ne peut pas être annulée. Cela
                                supprimera définitivement le rôle &quot;
                                {role.roleName}&quot; et toutes ses permissions
                                associées.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => handleDelete(role.id)}
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
