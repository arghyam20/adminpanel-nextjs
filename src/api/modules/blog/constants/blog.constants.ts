export const BLOGS_RESOURCE = "blogs";

export const BLOGS_PERMISSIONS = ["create", "read", "update", "delete"] as const;

export type BlogPermission = (typeof BLOGS_PERMISSIONS)[number];
