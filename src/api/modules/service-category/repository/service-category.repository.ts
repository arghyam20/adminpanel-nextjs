import type {
  CreateServiceCategoryDto,
  UpdateServiceCategoryDto,
} from "../dto/service-category.dto";
import type { ServiceCategoryRepositoryContract } from "../interfaces/service-category.interface";

export class ServiceCategoryRepository implements ServiceCategoryRepositoryContract {
  async create(_data: CreateServiceCategoryDto): Promise<unknown> {
    throw new Error("ServiceCategoryRepository.create is not implemented yet.");
  }

  async update(_id: number, _data: UpdateServiceCategoryDto): Promise<unknown> {
    throw new Error("ServiceCategoryRepository.update is not implemented yet.");
  }

  async findById(_id: number): Promise<unknown | null> {
    throw new Error("ServiceCategoryRepository.findById is not implemented yet.");
  }

  async softDelete(_id: number): Promise<unknown> {
    throw new Error("ServiceCategoryRepository.softDelete is not implemented yet.");
  }
}
