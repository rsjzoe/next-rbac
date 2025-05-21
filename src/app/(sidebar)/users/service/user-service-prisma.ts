import prisma from "@/lib/prisma";
import { CreateUser, User, UpdateUser } from "../user-type";
import { UserService } from "./user-service";
import { RoleService } from "../../roles/service/role-service";
import { Role } from "../../roles/types/type";
import { hashPassword } from "@/lib/password";

export class UserServicePrisma implements UserService {
  constructor(private roleService: RoleService) {}

  async addUser(user: CreateUser): Promise<User> {
    const role = await this.roleService.getByName(user.roleName);
    return await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        createdAt: new Date(),
        emailVerified: true,
        updatedAt: new Date(),
        role: {
          connect: {
            id: role.id,
          },
        },
        accounts: {
          create: {
            id: Date.now().toString(),
            accountId: Date.now().toString(),
            providerId: "credential",
            password: await hashPassword("0000"),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                service: true,
              },
            },
          },
        },
      },
    });
  }

  async delete(id: string): Promise<User> {
    return await prisma.user.delete({
      where: { id },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                service: true,
              },
            },
          },
        },
      },
    });
  }

  async listAll(): Promise<User[]> {
    return await prisma.user.findMany({
      include: {
        role: {
          include: {
            permissions: {
              include: {
                service: true,
              },
            },
          },
        },
      },
    });
  }

  async getById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                service: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async getByName(name: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: { name: name },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                service: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new Error(`User with name ${name} not found`);
    }
    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: { email: email },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                service: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    return user;
  }

  async updateUserById(id: string, updatedUser: UpdateUser): Promise<User> {
    let role: Role | null = null;
    if (updatedUser.role) {
      role = await this.roleService.getByName(updatedUser.role);
    }

    return await prisma.user.update({
      where: { id },
      data: {
        name: updatedUser.name,
        role: role
          ? {
              connect: {
                id: role.id,
              },
            }
          : undefined,
      },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                service: true,
              },
            },
          },
        },
      },
    });
  }
}
