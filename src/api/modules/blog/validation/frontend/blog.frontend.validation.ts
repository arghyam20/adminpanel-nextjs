import { z } from "zod";

export const FrontendSchema = z.object({});

export type BlogFrontendInput = z.infer<typeof FrontendSchema>;
