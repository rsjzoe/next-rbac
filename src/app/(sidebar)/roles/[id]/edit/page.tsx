import { notFound } from "next/navigation";
import { roleService } from "../../service/service";
import { EditRole } from "./components/edit-role";
import { serviceData } from "@/app/(sidebar)/service-data/service-data";

interface EditRolePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditRolePage({ params }: EditRolePageProps) {
  const { id } = await params;
  try {
    let role = await roleService.getById(Number(id));
    let services = await serviceData.listAll();
    return <EditRole role={role} services={services} />;
  } catch (error) {
    notFound();
  }
}
