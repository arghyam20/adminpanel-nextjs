import type { Status } from "@prisma/client";

export interface ServiceRecord {
  id: number;
  title: string;
  slug: string;
  shortDesc: string | null;
  description: string;
  image: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  ordering: number;
  status: Status;
  categoryId: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  category?: { id: number; name: string; slug: string } | null;
}
