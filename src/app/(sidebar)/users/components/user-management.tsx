"use client";

import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AddEditUserDialog } from "./add-edit-user-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { CreateUser, UpdateUser, User } from "../user-type";
import { addUser, deleteUser, updateUser } from "../actions";
import { Role } from "../../roles/types/type";
import { useUserConnected } from "../context/use-user-connected";

interface UserManagementProps {
  users: User[];
  roles: Role[];
}

export function UserManagement({ users, roles }: UserManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { hasAccess } = useUserConnected();

  const handleAddUser = async (user: CreateUser) => {
    await addUser(user);
    setIsAddDialogOpen(false);
  };

  const handleEditUser = async (id: string, user: UpdateUser) => {
    await updateUser(id, user);
    setIsEditDialogOpen(false);
  };

  const handleDeleteUser = async () => {
    if (currentUser) {
      await deleteUser(currentUser.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.roleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Administrateur":
        return "destructive";
      case "Éditeur":
        return "default";
      case "Utilisateur":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between ">
        <div>
          <CardTitle className="text-2xl">Liste des Utilisateurs</CardTitle>
          <CardDescription>
            Gérez les utilisateurs et leurs rôles dans le système.
          </CardDescription>
        </div>
        {hasAccess("utilisateurs", "canCreate") && (
          <Button onClick={() => setIsAddDialogOpen(true)}>
            Ajouter un utilisateur
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4">
          <Input
            placeholder="Rechercher par nom ou rôle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[40%]">Nom</TableHead>
                <TableHead className="w-[40%]">Rôle</TableHead>
                {(hasAccess("utilisateurs", "canUpdate") ||
                  hasAccess("utilisateurs", "canDelete")) && (
                  <TableHead className="w-[20%] text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role.roleName)}>
                        {user.role.roleName}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {hasAccess("utilisateurs", "canUpdate") && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setCurrentUser(user);
                              setIsEditDialogOpen(true);
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                        )}
                        {hasAccess("utilisateurs", "canDelete") && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setCurrentUser(user);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Supprimer</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    Aucun utilisateur trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <AddEditUserDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSave={(user) => {
          handleAddUser(user as CreateUser);
        }}
        title="Ajouter un utilisateur"
        roles={roles}
      />

      {currentUser && (
        <AddEditUserDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={(user) => {
            handleEditUser(currentUser.id, user);
          }}
          title="Modifier un utilisateur"
          user={currentUser}
          roles={roles}
        />
      )}

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cela supprimera
              définitivement l{"'"}utilisateur
              {currentUser && ` "${currentUser.name}"`} et supprimera ses
              données de nos serveurs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
