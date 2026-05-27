import type { Status } from "@prisma/client";

export interface ServiceCategoryRecord {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  status: Status;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
