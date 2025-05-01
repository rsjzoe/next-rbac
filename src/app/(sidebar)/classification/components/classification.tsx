"use client";

import { useContext, useState } from "react";
import { Edit, Plus, Trash2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddEditClassificationDialog } from "./add-edit-classification-dialog";
import { UserContext } from "../../users/context/user-context";
import { useUserConnected } from "../../users/context/use-user-connected";

// Type pour les classifications
type Classification = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  status: "active" | "inactive";
  category: string;
};

// Données d'exemple pour les classifications
const initialClassifications: Classification[] = [
  {
    id: 1,
    name: "Documents administratifs",
    description: "Documents officiels et administratifs",
    createdAt: "2023-05-15",
    status: "active",
    category: "Administration",
  },
  {
    id: 2,
    name: "Rapports financiers",
    description: "Rapports et analyses financières",
    createdAt: "2023-06-20",
    status: "active",
    category: "Finance",
  },
  {
    id: 3,
    name: "Contrats clients",
    description: "Contrats et accords avec les clients",
    createdAt: "2023-07-10",
    status: "active",
    category: "Juridique",
  },
  {
    id: 4,
    name: "Archives 2022",
    description: "Documents archivés de l'année 2022",
    createdAt: "2023-01-05",
    status: "inactive",
    category: "Archives",
  },
  {
    id: 5,
    name: "Ressources humaines",
    description: "Documents liés aux ressources humaines",
    createdAt: "2023-08-12",
    status: "active",
    category: "RH",
  },
];

// Catégories disponibles
const categories = [
  "Administration",
  "Finance",
  "Juridique",
  "Archives",
  "RH",
  "Marketing",
  "Technique",
];

export function ClassificationManagement() {
  const { hasAccess } = useUserConnected();

  const [classifications, setClassifications] = useState<Classification[]>(
    initialClassifications
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentClassification, setCurrentClassification] =
    useState<Classification | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const handleAddClassification = (
    classification: Omit<Classification, "id" | "createdAt">
  ) => {
    const newClassification: Classification = {
      id: Math.max(0, ...classifications.map((c) => c.id)) + 1,
      createdAt: new Date().toISOString().split("T")[0],
      ...classification,
    };
    setClassifications([...classifications, newClassification]);
    setIsAddDialogOpen(false);
  };

  const handleEditClassification = (
    classification: Classification | Omit<Classification, "id" | "createdAt">
  ) => {
    if ("id" in classification && "createdAt" in classification) {
      setClassifications(
        classifications.map((c) =>
          c.id === classification.id ? classification : c
        )
      );
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteClassification = () => {
    if (currentClassification) {
      setClassifications(
        classifications.filter((c) => c.id !== currentClassification.id)
      );
      setIsDeleteDialogOpen(false);
    }
  };

  // Filtrage des classifications
  const filteredClassifications = classifications.filter((classification) => {
    const matchesSearch =
      classification.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classification.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      classification.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || classification.status === statusFilter;

    const matchesCategory =
      categoryFilter === "all" || classification.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">Liste des Classifications</CardTitle>
          <CardDescription>
            Gérez les classifications de documents et de contenus.
          </CardDescription>
        </div>
        {hasAccess("classification", "canCreate") && (
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une classification
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[240px]">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as any)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[25%]">Nom</TableHead>
                <TableHead className="w-[30%]">Description</TableHead>
                <TableHead className="w-[15%]">Catégorie</TableHead>
                <TableHead className="w-[10%]">Statut</TableHead>
                <TableHead className="w-[10%]">Date de création</TableHead>
                <TableHead className="w-[10%] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClassifications.length > 0 ? (
                filteredClassifications.map((classification) => (
                  <TableRow
                    key={classification.id}
                    className="hover:bg-muted/30"
                  >
                    <TableCell className="font-medium">
                      {classification.name}
                    </TableCell>
                    <TableCell>{classification.description}</TableCell>
                    <TableCell>{classification.category}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          classification.status === "active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {classification.status === "active"
                          ? "Actif"
                          : "Inactif"}
                      </Badge>
                    </TableCell>
                    <TableCell>{classification.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCurrentClassification(classification);
                            setIsEditDialogOpen(true);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCurrentClassification(classification);
                            setIsDeleteDialogOpen(true);
                          }}
                          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Aucune classification trouvée.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <AddEditClassificationDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSave={handleAddClassification}
        title="Ajouter une classification"
        categories={categories}
      />

      {currentClassification && (
        <AddEditClassificationDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleEditClassification}
          title="Modifier une classification"
          classification={currentClassification}
          categories={categories}
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
              définitivement la classification
              {currentClassification && ` "${currentClassification.name}"`} et
              toutes les données associées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteClassification}
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
