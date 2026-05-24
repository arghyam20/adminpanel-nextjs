import { z } from "zod";

export const BackendSchema = z.object({});

export type UserBackendInput = z.infer<typeof BackendSchema>;
