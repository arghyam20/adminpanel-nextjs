export const ROLES_RESOURCE = "roles";

export const ROLES_PERMISSIONS = ["create", "read", "update", "delete"] as const;

export type RolePermission = (typeof ROLES_PERMISSIONS)[number];
