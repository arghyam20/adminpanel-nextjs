import type { QueryOptions } from "@/types";
import type { CreateTestimonialDto, UpdateTestimonialDto } from "../dto/testimonial.dto";
import type { TestimonialRepositoryContract } from "../interfaces/testimonial.interface";

export class TestimonialService {
  constructor(private readonly repository: TestimonialRepositoryContract) {}

  paginate(options: QueryOptions) { return this.repository.paginate(options); }

  async findById(id: number) {
    const record = await this.repository.findById(id);
    if (!record) throw Object.assign(new Error("Testimonial not found"), { statusCode: 404 });
    return record;
  }

  create(data: CreateTestimonialDto) { return this.repository.create(data); }

  async update(id: number, data: UpdateTestimonialDto) {
    await this.findById(id);
    return this.repository.update(id, data);
  }

  async softDelete(id: number) {
    await this.findById(id);
    return this.repository.softDelete(id);
  }
}
