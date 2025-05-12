import { ServiceDataService } from "./service-data-service";
import { ServicePrisma } from "./service-prisma";

export const serviceData: ServiceDataService = new ServicePrisma();
