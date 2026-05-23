import type { CreateServiceDto, UpdateServiceDto } from "../dto/service.dto";
import type { ServiceRepositoryContract } from "../interfaces/service.interface";

export class ServiceService {
  constructor(private readonly repository: ServiceRepositoryContract) {}

  create(data: CreateServiceDto) {
    return this.repository.create(data);
  }

  update(id: number, data: UpdateServiceDto) {
    return this.repository.update(id, data);
  }

  findById(id: number) {
    return this.repository.findById(id);
  }

  softDelete(id: number) {
    return this.repository.softDelete(id);
  }
}
