import { Service } from "../roles/types/type";

export interface ServiceDataService {
  listAll(): Promise<Service[]>;
  create(name: string): Promise<Service>;
  findByName(name: string): Promise<Service>;
}
