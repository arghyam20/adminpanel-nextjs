import type { Status } from "@prisma/client";

export interface ServiceRecord {
  id: number;
  title: string;
  slug: string;
  shortDesc: string | null;
  content: string | null;
  featuredImage: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  ordering: number;
  status: Status;
  categoryId: number | null;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  category?: { id: number; name: string; slug: string } | null;
}
