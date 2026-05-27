import { z } from "zod";

// Matches the DB ENUM('Active','Inactive') — used by every module schema
export const statusSchema = z.enum(["ACTIVE", "INACTIVE"]);

export const idSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  status: statusSchema.optional(),
  sortBy: z.string().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const toggleStatusSchema = z.object({
  status: statusSchema,
});
