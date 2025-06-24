import { serviceData } from "../../service-data/service-data";
import { CreateRoleClient } from "./components/create-role";

export default async function CreateRolePage() {
  const services = await serviceData.listAll();
  return <CreateRoleClient services={services} />;
}
