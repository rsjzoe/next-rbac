"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Role,
  Service,
  UpdatePermission,
} from "@/app/(sidebar)/roles/types/type";
import { toast } from "sonner";
import { updateRole } from "../../../actions";

interface EditRoleProps {
  role: Role;
  services: Service[];
}

export function EditRole({ role, services }: EditRoleProps) {
  const router = useRouter();
  const [roleName, setRoleName] = useState("");

  const [permissions, setPermissions] = useState<UpdatePermission[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setRoleName(role.roleName);

    // Initialize permissions based on role data
    const initialPermissions = services.map((service) => {
      const existingPermission = role.permissions.find(
        (p) => p.service.id === service.id
      );

      return {
        serviceId: service.id,
        canCreate: existingPermission?.canCreate || false,
        canRead: existingPermission?.canRead || false,
        canUpdate: existingPermission?.canUpdate || false,
        canDelete: existingPermission?.canDelete || false,
      };
    });

    setPermissions(initialPermissions);
  }, []);

  const handlePermissionChange = (
    serviceId: number,
    action: "canCreate" | "canRead" | "canUpdate" | "canDelete",
    value: boolean
  ) => {
    setPermissions((prev) =>
      prev.map((permission) =>
        permission.serviceId === serviceId
          ? { ...permission, [action]: value }
          : permission
      )
    );
  };

  const handleToggleAll = (serviceId: number, value: boolean) => {
    setPermissions((prev) =>
      prev.map((permission) =>
        permission.serviceId === serviceId
          ? {
              ...permission,
              canCreate: value,
              canRead: value,
              canUpdate: value,
              canDelete: value,
            }
          : permission
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!roleName.trim()) {
      toast("Erreur", {
        description: "Le nom du rôle est requis",
      });
      return;
    }

    setIsSaving(true);

    try {
      await updateRole(role.id, { permissions });

      toast("Succès", {
        description: "Le rôle a été mis à jour avec succès",
      });

      router.push("/roles");
    } catch (error) {
      toast("Erreur", { description: "Impossible de mettre à jour le rôle" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/roles")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-3xl font-bold">Modifier le rôle</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informations du rôle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="roleName">Nom du rôle</Label>
                <Input
                  id="roleName"
                  placeholder="Entrez le nom du rôle"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  required
                  disabled
                />
                <p className="text-sm text-muted-foreground">
                  Le nom du rôle ne peut pas être modifié
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <div className="grid grid-cols-6 gap-4 p-4 font-semibold border-b bg-slate-50">
                <div>Service</div>
                <div className="text-center">Tout</div>
                <div className="text-center">Créer</div>
                <div className="text-center">Lire</div>
                <div className="text-center">Modifier</div>
                <div className="text-center">Supprimer</div>
              </div>

              {services.map((service) => {
                const permission = permissions.find(
                  (p) => p.serviceId === service.id
                );
                const allChecked =
                  permission?.canCreate &&
                  permission?.canRead &&
                  permission?.canUpdate &&
                  permission?.canDelete;

                return (
                  <div
                    key={service.id}
                    className="grid grid-cols-6 gap-4 p-4 border-b last:border-0 items-center hover:bg-slate-50 transition-colors"
                  >
                    <div className="font-medium">{service.name}</div>

                    <div className="flex justify-center">
                      <Checkbox
                        id={`all-${service.id}`}
                        checked={allChecked}
                        onCheckedChange={(checked) =>
                          handleToggleAll(service.id, checked as boolean)
                        }
                      />
                    </div>

                    <div className="flex justify-center">
                      <Checkbox
                        id={`create-${service.id}`}
                        checked={permission?.canCreate || false}
                        onCheckedChange={(checked) =>
                          handlePermissionChange(
                            service.id,
                            "canCreate",
                            checked as boolean
                          )
                        }
                      />
                    </div>

                    <div className="flex justify-center">
                      <Checkbox
                        id={`read-${service.id}`}
                        checked={permission?.canRead || false}
                        onCheckedChange={(checked) =>
                          handlePermissionChange(
                            service.id,
                            "canRead",
                            checked as boolean
                          )
                        }
                      />
                    </div>

                    <div className="flex justify-center">
                      <Checkbox
                        id={`update-${service.id}`}
                        checked={permission?.canUpdate || false}
                        onCheckedChange={(checked) =>
                          handlePermissionChange(
                            service.id,
                            "canUpdate",
                            checked as boolean
                          )
                        }
                      />
                    </div>

                    <div className="flex justify-center">
                      <Checkbox
                        id={`delete-${service.id}`}
                        checked={permission?.canDelete || false}
                        onCheckedChange={(checked) =>
                          handlePermissionChange(
                            service.id,
                            "canDelete",
                            checked as boolean
                          )
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/roles")}
            className="mr-2"
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
