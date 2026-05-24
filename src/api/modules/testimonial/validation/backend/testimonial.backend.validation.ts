import { z } from "zod";

export const BackendSchema = z.object({});

export type TestimonialBackendInput = z.infer<typeof BackendSchema>;
