import type { CreateFaqDto, UpdateFaqDto } from "../dto/faq.dto";
import type { FaqService } from "../service/faq.service";

export class FaqController {
  constructor(private readonly service: FaqService) {}

  create(data: CreateFaqDto) {
    return this.service.create(data);
  }

  update(id: number, data: UpdateFaqDto) {
    return this.service.update(id, data);
  }

  findById(id: number) {
    return this.service.findById(id);
  }

  softDelete(id: number) {
    return this.service.softDelete(id);
  }
}
