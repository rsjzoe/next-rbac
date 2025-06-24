import prisma from "@/lib/prisma";
import { CreateRole, Role, UpdateRole } from "../types/type";
import { RoleService } from "./role-service";

export class RoleServicePrisma implements RoleService {
  async addRole(role: CreateRole): Promise<Role> {
    const createdRole = await prisma.role.create({
      data: {
        roleName: role.roleName,
        permissions: {
          create: role.permissions.map((permission) => ({
            canUpdate: permission.canUpdate,
            canDelete: permission.canDelete,
            canRead: permission.canRead,
            canCreate: permission.canCreate,
            service: {
              connect: {
                id: permission.serviceId,
              },
            },
          })),
        },
      },
      include: {
        permissions: {
          include: {
            service: true,
          },
        },
      },
    });
    return createdRole;
  }

  delete(id: number): Promise<Role> {
    const deletedRole = prisma.role.delete({
      where: {
        id: id,
      },
      include: {
        permissions: {
          include: {
            service: true,
          },
        },
      },
    });
    return deletedRole;
  }

  async listAll(): Promise<Role[]> {
    const data = await prisma.role.findMany({
      include: {
        permissions: {
          include: {
            service: true,
          },
        },
      },
    });
    return data;
  }
  async getById(id: number): Promise<Role> {
    const role = await prisma.role.findUnique({
      where: {
        id: id,
      },
      include: {
        permissions: {
          include: {
            service: true,
          },
        },
      },
    });
    if (!role) {
      throw new Error(`Role with ID ${id} not found`);
    }
    return role;
  }

  async getByName(name: string): Promise<Role> {
    const role = await prisma.role.findFirst({
      where: {
        roleName: name,
      },
      include: {
        permissions: {
          include: {
            service: true,
          },
        },
      },
    });
    if (!role) {
      throw new Error(`Role with ID ${name} not found`);
    }
    return role;
  }

  async updateRoleById(id: number, updatedRole: UpdateRole): Promise<Role> {
    const updated = await prisma.role.update({
      where: {
        id: id,
      },
      data: {
        permissions: {
          updateMany: updatedRole.permissions.map((permission) => ({
            where: {
              serviceId: permission.serviceId,
            },
            data: {
              canUpdate: permission.canUpdate,
              canDelete: permission.canDelete,
              canRead: permission.canRead,
              canCreate: permission.canCreate,
            },
          })),
        },
      },
      include: {
        permissions: {
          include: {
            service: true,
          },
        },
      },
    });
    return updated;
  }
}
