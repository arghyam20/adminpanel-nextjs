import type { CreateServiceDto, UpdateServiceDto } from "../dto/service.dto";

export interface ServiceRepositoryContract {
  create(data: CreateServiceDto): Promise<unknown>;
  update(id: number, data: UpdateServiceDto): Promise<unknown>;
  findById(id: number): Promise<unknown | null>;
  softDelete(id: number): Promise<unknown>;
}
