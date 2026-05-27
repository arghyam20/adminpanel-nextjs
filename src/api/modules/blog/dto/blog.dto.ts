import type { z } from "zod";
import type { blogSchema } from "@/validations/modules";
export type CreateBlogDto = z.infer<typeof blogSchema>;
export type UpdateBlogDto = Partial<CreateBlogDto>;
