export const CATEGORIES_RESOURCE = "categories";

export const CATEGORIES_PERMISSIONS = ["create", "read", "update", "delete"] as const;

export type CategoryPermission = (typeof CATEGORIES_PERMISSIONS)[number];
