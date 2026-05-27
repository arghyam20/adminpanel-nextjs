import type { SessionUser } from "@/lib/auth";

export type PermissionMap = Record<string, string[]>;

export const PERMISSIONS = {
  dashboard: ["read"],
  roles: ["create", "read", "update", "delete"],
  users: ["create", "read", "update", "delete"],
  categories: ["create", "read", "update", "delete"],
  faqs: ["create", "read", "update", "delete"],
  testimonials: ["create", "read", "update", "delete"],
  blogs: ["create", "read", "update", "delete"],
  serviceCategories: ["create", "read", "update", "delete"],
  services: ["create", "read", "update", "delete"],
} as const satisfies PermissionMap;

export function hasPermission(user: SessionUser | null, permission: string) {
  if (!user) return false;
  const [resource, action] = permission.split(".");
  return Boolean(resource && action && user.permissions?.[resource]?.includes(action));
}

export function hasRole(user: SessionUser | null, roles: string | string[]) {
  if (!user) return false;
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  return allowedRoles.includes(user.role);
}

export function hasEveryPermission(user: SessionUser | null, permissions: string[]) {
  return permissions.every((permission) => hasPermission(user, permission));
}

export function hasAnyPermission(user: SessionUser | null, permissions: string[]) {
  return permissions.some((permission) => hasPermission(user, permission));
}
