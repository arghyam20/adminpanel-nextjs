export const SERVICECATEGORIES_RESOURCE = "serviceCategories";

export const SERVICECATEGORIES_PERMISSIONS = ["create", "read", "update", "delete"] as const;

export type ServiceCategoryPermission = (typeof SERVICECATEGORIES_PERMISSIONS)[number];
