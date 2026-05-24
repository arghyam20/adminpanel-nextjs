import { z } from "zod";

export const FrontendSchema = z.object({});

export type CategoryFrontendInput = z.infer<typeof FrontendSchema>;
