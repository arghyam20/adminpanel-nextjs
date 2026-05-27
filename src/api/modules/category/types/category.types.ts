import type { Status } from "@prisma/client";
export interface CategoryRecord {
  id: number;
  name: string;
  slug: string;
  status: Status;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
