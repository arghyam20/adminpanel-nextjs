import { z } from "zod";

export const BackendSchema = z.object({});

export type CategoryBackendInput = z.infer<typeof BackendSchema>;
