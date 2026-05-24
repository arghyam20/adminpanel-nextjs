import type { CreateServiceDto, UpdateServiceDto } from "../dto/service.dto";
import type { ServiceService } from "../service/service.service";

export class ServiceController {
  constructor(private readonly service: ServiceService) {}

  create(data: CreateServiceDto) {
    return this.service.create(data);
  }

  update(id: number, data: UpdateServiceDto) {
    return this.service.update(id, data);
  }

  findById(id: number) {
    return this.service.findById(id);
  }

  softDelete(id: number) {
    return this.service.softDelete(id);
  }
}
