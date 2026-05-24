import { z } from "zod";

export const FrontendSchema = z.object({});

export type UserFrontendInput = z.infer<typeof FrontendSchema>;
