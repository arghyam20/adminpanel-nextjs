import type { Status } from "@prisma/client";

export interface RoleRecord {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  permissions: Record<string, string[]>;
  status: Status;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
