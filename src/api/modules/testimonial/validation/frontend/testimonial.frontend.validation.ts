import { z } from "zod";

export const FrontendSchema = z.object({});

export type TestimonialFrontendInput = z.infer<typeof FrontendSchema>;
