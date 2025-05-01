"use server";

import {
  Role,
  Service,
  CreateRole,
  UpdateRole,
  HasAccess,
  HasAccessOutput,
} from "@/app/(sidebar)/roles/types/type";

// import type {
//   Role,
//   Service,
//   CreateRole,
//   UpdateRole,
//   HasAccess,
//   HasAccessOutput,
// } from "./types";

// Simulated data for demonstration purposes
// In a real application, these would be database calls

let roles: Role[] = [
  {
    id: 1,
    roleName: "Admin",
    permissions: [
      {
        id: 1,
        canCreate: true,
        canRead: true,
        canUpdate: true,
        canDelete: true,
        service: { id: 1, name: "roles" },
      },
      {
        id: 2,
        canCreate: true,
        canRead: true,
        canUpdate: true,
        canDelete: true,
        service: { id: 2, name: "utilisateurs" },
      },
    ],
  },
  {
    id: 2,
    roleName: "Utilisateur",
    permissions: [
      {
        id: 3,
        canCreate: false,
        canRead: true,
        canUpdate: false,
        canDelete: false,
        service: { id: 1, name: "roles" },
      },
      {
        id: 4,
        canCreate: false,
        canRead: true,
        canUpdate: true,
        canDelete: false,
        service: { id: 2, name: "utilisateurs" },
      },
    ],
  },
];

const services: Service[] = [
  { id: 1, name: "roles" },
  { id: 2, name: "utilisateurs" },
  { id: 3, name: "classification" },
  { id: 4, name: "category" },
  { id: 5, name: "corbeille" },
];

// Get all roles
export async function getRoles(): Promise<Role[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return roles;
}

// Get a single role by ID
export async function getRole(id: number): Promise<Role> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const role = roles.find((r) => r.id === id);

  if (!role) {
    throw new Error(`Role with ID ${id} not found`);
  }

  return role;
}

// Create a new role
export async function createRole(data: CreateRole): Promise<Role> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newId = roles.length > 0 ? Math.max(...roles.map((r) => r.id)) + 1 : 1;
  const permissionId = roles.flatMap((r) => r.permissions).length + 1;

  const newRole: Role = {
    id: newId,
    roleName: data.roleName,
    permissions: data.permissions.map((p, index) => ({
      id: permissionId + index,
      canCreate: p.canCreate,
      canRead: p.canRead,
      canUpdate: p.canUpdate,
      canDelete: p.canDelete,
      service: services.find((s) => s.id === p.serviceId)!,
    })),
  };

  roles.push(newRole);
  return newRole;
}

// Update an existing role
export async function updateRole(id: number, data: UpdateRole): Promise<Role> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const roleIndex = roles.findIndex((r) => r.id === id);

  if (roleIndex === -1) {
    throw new Error(`Role with ID ${id} not found`);
  }

  // Update permissions
  const updatedRole = {
    ...roles[roleIndex],
    permissions: data.permissions.map((p) => {
      const service = services.find((s) => s.id === p.serviceId)!;
      const existingPermission = roles[roleIndex].permissions.find(
        (perm) => perm.service.id === p.serviceId
      );

      return {
        id: existingPermission?.id || Math.random(),
        canCreate: p.canCreate,
        canRead: p.canRead,
        canUpdate: p.canUpdate,
        canDelete: p.canDelete,
        service,
      };
    }),
  };

  roles[roleIndex] = updatedRole;
  return updatedRole;
}

// Delete a role
export async function deleteRole(id: number): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const roleIndex = roles.findIndex((r) => r.id === id);

  if (roleIndex === -1) {
    throw new Error(`Role with ID ${id} not found`);
  }

  roles = roles.filter((r) => r.id !== id);
}

// Get all services
export async function getServices(): Promise<Service[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return services;
}

// Check if a role has access to a specific action on a service
export async function hasAccess(data: HasAccess): Promise<HasAccessOutput> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const role = roles.find((r) => r.roleName === data.roleName);

  if (!role) {
    return { ok: false };
  }

  const permission = role.permissions.find(
    (p) => p.service.name === data.serviceName
  );

  if (!permission) {
    return { ok: false };
  }

  return { ok: permission[data.action] };
}
