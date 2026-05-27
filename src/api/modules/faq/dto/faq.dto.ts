import type { z } from "zod";
import type { faqSchema } from "@/validations/modules";
export type CreateFaqDto = z.infer<typeof faqSchema>;
export type UpdateFaqDto = Partial<CreateFaqDto>;
