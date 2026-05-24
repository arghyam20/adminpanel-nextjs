export const USERS_RESOURCE = "users";

export const USERS_PERMISSIONS = ["create", "read", "update", "delete"] as const;

export type UserPermission = (typeof USERS_PERMISSIONS)[number];
