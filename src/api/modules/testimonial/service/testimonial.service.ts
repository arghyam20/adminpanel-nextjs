import type { CreateTestimonialDto, UpdateTestimonialDto } from "../dto/testimonial.dto";
import type { TestimonialRepositoryContract } from "../interfaces/testimonial.interface";

export class TestimonialService {
  constructor(private readonly repository: TestimonialRepositoryContract) {}

  create(data: CreateTestimonialDto) {
    return this.repository.create(data);
  }

  update(id: number, data: UpdateTestimonialDto) {
    return this.repository.update(id, data);
  }

  findById(id: number) {
    return this.repository.findById(id);
  }

  softDelete(id: number) {
    return this.repository.softDelete(id);
  }
}
