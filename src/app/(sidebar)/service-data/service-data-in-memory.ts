import { Service, ServiceName } from "../roles/types/type";
import { ServiceDataService } from "./service-data-service";

export class ServiceDataInMemory implements ServiceDataService {
  private services: Service[] = [
    { id: 1, name: "classification" },
    { id: 2, name: "roles" },
    { id: 3, name: "utilisateurs" },
  ];

  async listAll(): Promise<Service[]> {
    return this.services;
  }

  async create(name: ServiceName): Promise<Service> {
    const newService: Service = {
      id: Date.now(),
      name,
    };
    this.services.push(newService);
    return newService;
  }

  findByName(name: ServiceName): Promise<Service> {
    const service = this.services.find((service) => service.name === name);
    if (!service) {
      throw new Error(`Service with name ${name} not found`);
    }
    return Promise.resolve(service);
  }

  async findServiceById(id: number): Promise<Service> {
    const service = this.services.find((service) => service.id === id);
    if (!service) {
      throw new Error(`Service with id ${id} not found`);
    }
    return Promise.resolve(service);
  }
}
