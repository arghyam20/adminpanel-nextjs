import type { z } from "zod";
import type { categorySchema } from "@/validations/modules";
export type CreateCategoryDto = z.infer<typeof categorySchema>;
export type UpdateCategoryDto = Partial<CreateCategoryDto>;
