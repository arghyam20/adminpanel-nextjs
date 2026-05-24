import type { CreateServiceCategoryDto, UpdateServiceCategoryDto } from "../dto/service-category.dto";

export interface ServiceCategoryRepositoryContract {
  create(data: CreateServiceCategoryDto): Promise<unknown>;
  update(id: number, data: UpdateServiceCategoryDto): Promise<unknown>;
  findById(id: number): Promise<unknown | null>;
  softDelete(id: number): Promise<unknown>;
}
