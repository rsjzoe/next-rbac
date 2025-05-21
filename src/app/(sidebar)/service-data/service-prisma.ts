import prisma from "@/lib/prisma";
import { ServiceDataService } from "./service-data-service";
import { Service, ServiceName } from "../roles/types/type";

export class ServicePrisma implements ServiceDataService {
  async listAll(): Promise<Service[]> {
    const data = await prisma.service.findMany();
    return data;
  }

  async create(name: string): Promise<Service> {
    const newService = await prisma.service.create({
      data: {
        name: name as ServiceName,
      },
    });
    return newService;
  }

  async findByName(name: string): Promise<Service> {
    const service = await prisma.service.findFirst({
      where: {
        name: name as ServiceName,
      },
    });
    if (!service) {
      throw new Error(`Service with name ${name} not found`);
    }
    return service;
  }

  async findServiceById(id: number): Promise<Service> {
    const service = await prisma.service.findUnique({
      where: {
        id: id,
      },
    });
    if (!service) {
      throw new Error(`Service with id ${id} not found`);
    }
    return service;
  }
}
