import type { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";
import type { CategoryService } from "../service/category.service";

export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  create(data: CreateCategoryDto) {
    return this.service.create(data);
  }

  update(id: number, data: UpdateCategoryDto) {
    return this.service.update(id, data);
  }

  findById(id: number) {
    return this.service.findById(id);
  }

  softDelete(id: number) {
    return this.service.softDelete(id);
  }
}
