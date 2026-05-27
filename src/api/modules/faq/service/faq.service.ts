import type { QueryOptions } from "@/types";
import type { CreateFaqDto, UpdateFaqDto } from "../dto/faq.dto";
import type { FaqRepository } from "../repository/faq.repository";

export class FaqService {
  constructor(private readonly repository: FaqRepository) {}
  paginate(options: QueryOptions) { return this.repository.paginate(options); }
  async findById(id: number) {
    const record = await this.repository.findById(id);
    if (!record) throw Object.assign(new Error("FAQ not found"), { statusCode: 404 });
    return record;
  }
  create(data: CreateFaqDto) { return this.repository.create(data); }
  async update(id: number, data: UpdateFaqDto) { await this.findById(id); return this.repository.update(id, data); }
  async softDelete(id: number) { await this.findById(id); return this.repository.softDelete(id); }
}
