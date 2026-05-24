import type { CreateTestimonialDto, UpdateTestimonialDto } from "../dto/testimonial.dto";
import type { TestimonialService } from "../service/testimonial.service";

export class TestimonialController {
  constructor(private readonly service: TestimonialService) {}

  create(data: CreateTestimonialDto) {
    return this.service.create(data);
  }

  update(id: number, data: UpdateTestimonialDto) {
    return this.service.update(id, data);
  }

  findById(id: number) {
    return this.service.findById(id);
  }

  softDelete(id: number) {
    return this.service.softDelete(id);
  }
}
