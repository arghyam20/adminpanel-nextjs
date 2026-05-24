import { z } from "zod";

export const FrontendSchema = z.object({});

export type FaqFrontendInput = z.infer<typeof FrontendSchema>;
