export const SERVICES_RESOURCE = "services";

export const SERVICES_PERMISSIONS = ["create", "read", "update", "delete"] as const;

export type ServicePermission = (typeof SERVICES_PERMISSIONS)[number];
