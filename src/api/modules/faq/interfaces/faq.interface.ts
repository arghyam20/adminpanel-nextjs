import type { QueryOptions } from "@/types";
import type { CreateFaqDto, UpdateFaqDto } from "../dto/faq.dto";
import type { FaqRecord } from "../types/faq.types";

export interface PaginatedResult<T> {
  items: T[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

export interface FaqRepositoryContract {
  paginate(options: QueryOptions): Promise<PaginatedResult<FaqRecord>>;
  findById(id: number): Promise<FaqRecord | null>;
  create(data: CreateFaqDto): Promise<FaqRecord>;
  update(id: number, data: UpdateFaqDto): Promise<FaqRecord>;
  softDelete(id: number): Promise<FaqRecord>;
}
