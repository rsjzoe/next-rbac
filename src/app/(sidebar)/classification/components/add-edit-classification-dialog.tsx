"use client";

import { useState, useEffect } from "react";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Type pour les classifications
type Classification = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  status: "active" | "inactive";
  category: string;
};

type AddEditClassificationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (
    classification: Classification | Omit<Classification, "id" | "createdAt">
  ) => void;
  title: string;
  classification?: Classification;
  categories: string[];
};

export function AddEditClassificationDialog({
  open,
  onOpenChange,
  onSave,
  title,
  classification,
  categories,
}: AddEditClassificationDialogProps) {
  const [name, setName] = useState(classification?.name || "");
  const [description, setDescription] = useState(
    classification?.description || ""
  );
  const [status, setStatus] = useState<"active" | "inactive">(
    classification?.status || "active"
  );
  const [category, setCategory] = useState(
    classification?.category || categories[0] || ""
  );
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    if (open) {
      // Réinitialiser les champs lorsque la boîte de dialogue s'ouvre
      setName(classification?.name || "");
      setDescription(classification?.description || "");
      setStatus(classification?.status || "active");
      setCategory(classification?.category || categories[0] || "");
      setNameError("");
    }
  }, [open, classification, categories]);

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Le nom est requis");
      isValid = false;
    } else {
      setNameError("");
    }

    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (classification) {
      onSave({
        ...classification,
        name,
        description,
        status,
        category,
      });
    } else {
      onSave({
        name,
        description,
        status,
        category,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Remplissez les informations ci-dessous pour{" "}
            {classification ? "modifier" : "ajouter"} une classification.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="flex items-center">
              Nom
              {nameError && (
                <span className="text-destructive text-sm ml-2">
                  ({nameError})
                </span>
              )}
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez le nom de la classification"
              className={nameError ? "border-destructive" : ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Entrez une description"
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Statut</Label>
            <RadioGroup
              value={status}
              onValueChange={(value) =>
                setStatus(value as "active" | "inactive")
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="active" />
                <Label htmlFor="active" className="cursor-pointer">
                  Actif
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inactive" id="inactive" />
                <Label htmlFor="inactive" className="cursor-pointer">
                  Inactif
                </Label>
              </div>
            </RadioGroup>
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
