import type { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";
import type { CategoryRepositoryContract } from "../interfaces/category.interface";

export class CategoryService {
  constructor(private readonly repository: CategoryRepositoryContract) {}

  create(data: CreateCategoryDto) {
    return this.repository.create(data);
  }

  update(id: number, data: UpdateCategoryDto) {
    return this.repository.update(id, data);
  }

  findById(id: number) {
    return this.repository.findById(id);
  }

  softDelete(id: number) {
    return this.repository.softDelete(id);
  }
}
