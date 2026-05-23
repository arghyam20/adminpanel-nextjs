import { z } from "zod";

export const BackendSchema = z.object({});

export type RoleBackendInput = z.infer<typeof BackendSchema>;
