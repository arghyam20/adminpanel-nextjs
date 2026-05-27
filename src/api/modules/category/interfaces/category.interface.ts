import type { QueryOptions } from "@/types";
import type { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";
import type { CategoryRecord } from "../types/category.types";
export interface PaginatedResult<T> { items: T[]; meta: { page: number; pageSize: number; total: number; totalPages: number }; }
export interface CategoryRepositoryContract {
  paginate(options: QueryOptions): Promise<PaginatedResult<CategoryRecord>>;
  findById(id: number): Promise<CategoryRecord | null>;
  findBySlug(slug: string): Promise<CategoryRecord | null>;
  create(data: CreateCategoryDto): Promise<CategoryRecord>;
  update(id: number, data: UpdateCategoryDto): Promise<CategoryRecord>;
  softDelete(id: number): Promise<CategoryRecord>;
}
