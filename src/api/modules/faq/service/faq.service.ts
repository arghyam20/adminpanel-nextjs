import type { CreateFaqDto, UpdateFaqDto } from "../dto/faq.dto";
import type { FaqRepositoryContract } from "../interfaces/faq.interface";

export class FaqService {
  constructor(private readonly repository: FaqRepositoryContract) {}

  create(data: CreateFaqDto) {
    return this.repository.create(data);
  }

  update(id: number, data: UpdateFaqDto) {
    return this.repository.update(id, data);
  }

  findById(id: number) {
    return this.repository.findById(id);
  }

  softDelete(id: number) {
    return this.repository.softDelete(id);
  }
}
