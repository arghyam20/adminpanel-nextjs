import type { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";

export interface CategoryRepositoryContract {
  create(data: CreateCategoryDto): Promise<unknown>;
  update(id: number, data: UpdateCategoryDto): Promise<unknown>;
  findById(id: number): Promise<unknown | null>;
  softDelete(id: number): Promise<unknown>;
}
