import type { z } from "zod";

import type { roleSchema } from "@/validations/modules";

export type CreateRoleDto = z.infer<typeof roleSchema>;
export type UpdateRoleDto = Partial<CreateRoleDto>;
