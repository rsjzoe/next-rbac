import { ServiceDataInMemory } from "./service-data-in-memory";
import { ServiceDataService } from "./service-data-service";

export const serviceData: ServiceDataService = new ServiceDataInMemory();
