import type { QueryOptions } from "@/types";
import type { CreateServiceCategoryDto, UpdateServiceCategoryDto } from "../dto/service-category.dto";
import type { ServiceCategoryRecord } from "../types/service-category.types";

export interface PaginatedResult<T> {
  items: T[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

export interface ServiceCategoryRepositoryContract {
  paginate(options: QueryOptions): Promise<PaginatedResult<ServiceCategoryRecord>>;
  findById(id: number): Promise<ServiceCategoryRecord | null>;
  findBySlug(slug: string): Promise<ServiceCategoryRecord | null>;
  create(data: CreateServiceCategoryDto): Promise<ServiceCategoryRecord>;
  update(id: number, data: UpdateServiceCategoryDto): Promise<ServiceCategoryRecord>;
  softDelete(id: number): Promise<ServiceCategoryRecord>;
}
