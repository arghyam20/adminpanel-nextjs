import { z } from "zod";

export const BackendSchema = z.object({});

export type FaqBackendInput = z.infer<typeof BackendSchema>;
