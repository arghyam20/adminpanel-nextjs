import type { CreateTestimonialDto, UpdateTestimonialDto } from "../dto/testimonial.dto";
import type { TestimonialRepositoryContract } from "../interfaces/testimonial.interface";

export class TestimonialRepository implements TestimonialRepositoryContract {
  async create(_data: CreateTestimonialDto): Promise<unknown> {
    throw new Error("TestimonialRepository.create is not implemented yet.");
  }

  async update(_id: number, _data: UpdateTestimonialDto): Promise<unknown> {
    throw new Error("TestimonialRepository.update is not implemented yet.");
  }

  async findById(_id: number): Promise<unknown | null> {
    throw new Error("TestimonialRepository.findById is not implemented yet.");
  }

  async softDelete(_id: number): Promise<unknown> {
    throw new Error("TestimonialRepository.softDelete is not implemented yet.");
  }
}
