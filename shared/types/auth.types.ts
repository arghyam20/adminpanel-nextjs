export type PermissionMap = Record<string, string[]>;

export type AuthUser = {
  id: number;
  email: string;
  name: string;
  role: string;
  permissions: PermissionMap;
};
