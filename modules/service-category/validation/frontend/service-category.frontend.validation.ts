import { z } from "zod";

export const FrontendSchema = z.object({});

export type ServiceCategoryFrontendInput = z.infer<typeof FrontendSchema>;
