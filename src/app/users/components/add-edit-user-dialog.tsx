"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type User = {
  id: string;
  name: string;
  role: string;
};

type AddEditUserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (user: User | Omit<User, "id">) => void;
  title: string;
  user?: User;
};

export function AddEditUserDialog({
  open,
  onOpenChange,
  onSave,
  title,
  user,
}: AddEditUserDialogProps) {
  const [name, setName] = useState(user?.name || "");
  const [role, setRole] = useState(user?.role || "");

  const handleSave = () => {
    if (name && role) {
      if (user) {
        onSave({ ...user, name, role });
      } else {
        onSave({ name, role });
      }
      setName("");
      setRole("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Remplissez les informations ci-dessous pour{" "}
            {user ? "modifier" : "ajouter"} un utilisateur.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez le nom de l'utilisateur"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Rôle</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Sélectionnez un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Administrateur">Administrateur</SelectItem>
                <SelectItem value="Éditeur">Éditeur</SelectItem>
                <SelectItem value="Utilisateur">Utilisateur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
