import type { CreateFaqDto, UpdateFaqDto } from "../dto/faq.dto";

export interface FaqRepositoryContract {
  create(data: CreateFaqDto): Promise<unknown>;
  update(id: number, data: UpdateFaqDto): Promise<unknown>;
  findById(id: number): Promise<unknown | null>;
  softDelete(id: number): Promise<unknown>;
}
