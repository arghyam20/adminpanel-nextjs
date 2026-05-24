import type { CreateServiceDto, UpdateServiceDto } from "../dto/service.dto";
import type { ServiceRepositoryContract } from "../interfaces/service.interface";

export class ServiceRepository implements ServiceRepositoryContract {
  async create(_data: CreateServiceDto): Promise<unknown> {
    throw new Error("ServiceRepository.create is not implemented yet.");
  }

  async update(_id: number, _data: UpdateServiceDto): Promise<unknown> {
    throw new Error("ServiceRepository.update is not implemented yet.");
  }

  async findById(_id: number): Promise<unknown | null> {
    throw new Error("ServiceRepository.findById is not implemented yet.");
  }

  async softDelete(_id: number): Promise<unknown> {
    throw new Error("ServiceRepository.softDelete is not implemented yet.");
  }
}
