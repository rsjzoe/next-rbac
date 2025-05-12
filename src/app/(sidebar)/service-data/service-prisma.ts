import prisma from "@/lib/prisma";
import { ServiceDataService } from "./service-data-service";
import { ServiceName } from "../roles/types/type";

export class ServicePrisma implements ServiceDataService {
  async listAll(): Promise<any[]> {
    const data = await prisma.service.findMany();
    return data;
  }

  async create(name: string): Promise<any> {
    const newService = await prisma.service.create({
      data: {
        name: name as ServiceName,
      },
    });
    return newService;
  }

  findByName(name: string): Promise<any> {
    const service = prisma.service.findFirst({
      where: {
        name: name as ServiceName,
      },
    });
    return service;
  }

  findServiceById(id: number): Promise<any> {
    const service = prisma.service.findUnique({
      where: {
        id: id,
      },
    });
    return service;
  }
}
