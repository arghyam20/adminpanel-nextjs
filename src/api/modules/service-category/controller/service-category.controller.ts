import type {
  CreateServiceCategoryDto,
  UpdateServiceCategoryDto,
} from "../dto/service-category.dto";
import type { ServiceCategoryService } from "../service/service-category.service";

export class ServiceCategoryController {
  constructor(private readonly service: ServiceCategoryService) {}

  create(data: CreateServiceCategoryDto) {
    return this.service.create(data);
  }

  update(id: number, data: UpdateServiceCategoryDto) {
    return this.service.update(id, data);
  }

  findById(id: number) {
    return this.service.findById(id);
  }

  softDelete(id: number) {
    return this.service.softDelete(id);
  }
}
