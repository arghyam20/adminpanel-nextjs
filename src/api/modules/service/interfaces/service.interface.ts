import type { QueryOptions } from "@/types";
import type { CreateServiceDto, UpdateServiceDto } from "../dto/service.dto";
import type { ServiceRecord } from "../types/service.types";

export interface PaginatedResult<T> {
  items: T[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

export interface ServiceRepositoryContract {
  paginate(options: QueryOptions): Promise<PaginatedResult<ServiceRecord>>;
  findById(id: number): Promise<ServiceRecord | null>;
  findBySlug(slug: string): Promise<ServiceRecord | null>;
  create(data: CreateServiceDto): Promise<ServiceRecord>;
  update(id: number, data: UpdateServiceDto): Promise<ServiceRecord>;
  softDelete(id: number): Promise<ServiceRecord>;
}
