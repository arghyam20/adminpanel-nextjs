import type { z } from "zod";

import type { userSchema } from "@/validations/modules";

export type CreateUserDto = z.infer<typeof userSchema>;
export type UpdateUserDto = Partial<CreateUserDto>;
