import type { z } from "zod";
import type { serviceSchema } from "@/validations/modules";
export type CreateServiceDto = z.infer<typeof serviceSchema>;
export type UpdateServiceDto = Partial<CreateServiceDto>;
