export type Role = {
  id: number;
  roleName: string;
  permissions: Permission[];
};

export type Permission = {
  id: number;
  canUpdate: boolean;
  canDelete: boolean;
  canRead: boolean;
  canCreate: boolean;
  service: Service;
};

export type Service = {
  id: number;
  name: ServiceName;
};

export type CreatePermission = {
  canUpdate: boolean;
  canDelete: boolean;
  canRead: boolean;
  canCreate: boolean;
  serviceId: number;
};

export type CreateRole = {
  roleName: string;
  permissions: CreatePermission[];
};

export type UpdatePermission = {
  canUpdate: boolean;
  canDelete: boolean;
  canRead: boolean;
  canCreate: boolean;
  serviceId: number;
};

export type UpdateRole = {
  permissions: UpdatePermission[];
};

export type HasAccess = {
  roleName: string;
  serviceName: ServiceName;
  action: ActionType;
};

export type HasAccessOutput = {
  ok: boolean;
};

export type ActionType = "canUpdate" | "canDelete" | "canRead" | "canCreate";

export type ServiceName = "classification" | "roles" | "utilisateurs";
