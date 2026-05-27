import type { Status } from "@prisma/client";

export interface BlogRecord {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  status: Status;
  publishedAt: Date | null;
  categoryId: number | null;
  authorId: number | null;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  category?: { id: number; name: string; slug: string } | null;
  author?: { id: number; name: string; email: string } | null;
}
