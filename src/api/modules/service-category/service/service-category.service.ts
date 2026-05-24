import type {
  CreateServiceCategoryDto,
  UpdateServiceCategoryDto,
} from "../dto/service-category.dto";
import type { ServiceCategoryRepositoryContract } from "../interfaces/service-category.interface";

export class ServiceCategoryService {
  constructor(private readonly repository: ServiceCategoryRepositoryContract) {}

  create(data: CreateServiceCategoryDto) {
    return this.repository.create(data);
  }

  update(id: number, data: UpdateServiceCategoryDto) {
    return this.repository.update(id, data);
  }

  findById(id: number) {
    return this.repository.findById(id);
  }

  softDelete(id: number) {
    return this.repository.softDelete(id);
  }
}
