import { z } from "zod";

export const FrontendSchema = z.object({});

export type ServiceFrontendInput = z.infer<typeof FrontendSchema>;
