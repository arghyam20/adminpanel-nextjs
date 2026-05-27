import type { QueryOptions } from "@/types";
import type { CreateTestimonialDto, UpdateTestimonialDto } from "../dto/testimonial.dto";
import type { TestimonialRecord } from "../types/testimonial.types";

export interface PaginatedResult<T> {
  items: T[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

export interface TestimonialRepositoryContract {
  paginate(options: QueryOptions): Promise<PaginatedResult<TestimonialRecord>>;
  findById(id: number): Promise<TestimonialRecord | null>;
  create(data: CreateTestimonialDto): Promise<TestimonialRecord>;
  update(id: number, data: UpdateTestimonialDto): Promise<TestimonialRecord>;
  softDelete(id: number): Promise<TestimonialRecord>;
}
