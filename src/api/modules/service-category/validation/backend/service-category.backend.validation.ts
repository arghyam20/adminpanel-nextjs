import { z } from "zod";

export const BackendSchema = z.object({});

export type ServiceCategoryBackendInput = z.infer<typeof BackendSchema>;
