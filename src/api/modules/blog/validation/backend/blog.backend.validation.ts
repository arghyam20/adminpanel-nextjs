import { z } from "zod";

export const BackendSchema = z.object({});

export type BlogBackendInput = z.infer<typeof BackendSchema>;
