import { Service } from "../roles/types/type";
import { ServiceDataService } from "./service-data-service";

export class ServiceDataInMemory implements ServiceDataService {
  private services: Service[] = [
    { id: 1, name: "classification" },
    { id: 2, name: "roles" },
    { id: 3, name: "users" },
    { id: 4, name: "permissions" },
  ];

  async listAll(): Promise<Service[]> {
    return this.services;
  }

  async create(name: string): Promise<Service> {
    const newService: Service = {
      id: Date.now(),
      name,
    };
    this.services.push(newService);
    return newService;
  }

  findByName(name: string): Promise<Service> {
    const service = this.services.find((service) => service.name === name);
    if (!service) {
      throw new Error(`Service with name ${name} not found`);
    }
    return Promise.resolve(service);
  }
}
