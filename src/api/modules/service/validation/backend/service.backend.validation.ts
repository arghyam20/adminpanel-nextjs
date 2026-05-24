import { z } from "zod";

export const BackendSchema = z.object({});

export type ServiceBackendInput = z.infer<typeof BackendSchema>;
