import type { z } from "zod";
import type { testimonialSchema } from "@/validations/modules";
export type CreateTestimonialDto = z.infer<typeof testimonialSchema>;
export type UpdateTestimonialDto = Partial<CreateTestimonialDto>;
