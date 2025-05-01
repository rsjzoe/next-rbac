import { notFound } from "next/navigation";
import { roleService } from "../../service/service";
import { EditRole } from "./components/edit-role";

interface EditRolePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditRolePage({ params }: EditRolePageProps) {
  const { id } = await params;
  try {
    let role = await roleService.getById(Number(id));
    return (
      <>
        <EditRole role={role} />
      </>
    );
  } catch (error) {
    notFound();
  }
}
