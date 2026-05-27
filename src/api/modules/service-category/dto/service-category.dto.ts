import type { z } from "zod";
import type { serviceCategorySchema } from "@/validations/modules";
export type CreateServiceCategoryDto = z.infer<typeof serviceCategorySchema>;
export type UpdateServiceCategoryDto = Partial<CreateServiceCategoryDto>;
