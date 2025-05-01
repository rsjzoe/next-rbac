import { Service, ServiceName } from "../roles/types/type";

export interface ServiceDataService {
  listAll(): Promise<Service[]>;
  create(name: ServiceName): Promise<Service>;
  findByName(name: ServiceName): Promise<Service>;
}
