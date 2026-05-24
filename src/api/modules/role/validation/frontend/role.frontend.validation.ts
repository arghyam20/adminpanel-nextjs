import { z } from "zod";

export const FrontendSchema = z.object({});

export type RoleFrontendInput = z.infer<typeof FrontendSchema>;
