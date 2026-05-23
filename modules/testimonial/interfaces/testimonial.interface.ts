import type { CreateTestimonialDto, UpdateTestimonialDto } from "../dto/testimonial.dto";

export interface TestimonialRepositoryContract {
  create(data: CreateTestimonialDto): Promise<unknown>;
  update(id: number, data: UpdateTestimonialDto): Promise<unknown>;
  findById(id: number): Promise<unknown | null>;
  softDelete(id: number): Promise<unknown>;
}
