import prisma from "@/lib/prisma";
import { serviceData } from "./(sidebar)/service-data/service-data";
import { ServiceName } from "./(sidebar)/roles/types/type";
import { roleService } from "./(sidebar)/roles/service/service";
import { hashPassword } from "@/lib/password";
export async function createService(name: ServiceName) {
  try {
    const data = await serviceData.findByName(name);

    return data;
  } catch (error) {
    console.log(error);
    const data = await serviceData.create(name);

    return data;
  }
}

async function main() {
  const serviceUser = await createService("utilisateurs");
  const serviceRole = await createService("roles");
  const serviceClassification = await createService("classification");
  let superadminRole;
  try {
    superadminRole = await roleService.getByName("superadmin");
  } catch (error) {
    console.log(error);
    superadminRole = await prisma.role.create({
      data: {
        roleName: "superadmin",
        permissions: {
          create: [
            {
              canCreate: true,
              canRead: true,
              canUpdate: true,
              canDelete: true,
              serviceId: serviceUser.id,
            },
            {
              canCreate: true,
              canRead: true,
              canUpdate: true,
              canDelete: true,
              serviceId: serviceRole.id,
            },
            {
              canCreate: true,
              canRead: true,
              canUpdate: true,
              canDelete: true,
              serviceId: serviceClassification.id,
            },
          ],
        },
      },
    });
  }

  //   console.log("Rôle superadmin créé avec succès:", superadminRole);

  const email = "admin@example.com";
  const password = "12345789";

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    // console.log("Un utilisateur avec cet email existe déjà.");
    return;
  }

  // Créer l'utilisateur
  await prisma.user.create({
    data: {
      name: "Super Admin",
      email,
      emailVerified: true,
      role: {
        connect: { id: superadminRole.id },
      },
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      accounts: {
        create: {
          id: Date.now().toString(),
          accountId: Date.now().toString(),
          providerId: "credential",
          password: await hashPassword(password),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    },
  });

  //   console.log("Utilisateur superadmin créé avec succès:", user);
}

export function createSuperadmin() {
  main().catch((e) => {
    console.error("Erreur lors de la création du rôle superadmin:", e);
    process.exit(1);
  });
}
