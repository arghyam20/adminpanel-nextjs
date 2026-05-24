export type PermissionMap = Record<string, string[]>;

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
  permissions: PermissionMap;
}
