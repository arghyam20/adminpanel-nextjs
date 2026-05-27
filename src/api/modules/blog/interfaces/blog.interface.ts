import type { QueryOptions } from "@/types";
import type { CreateBlogDto, UpdateBlogDto } from "../dto/blog.dto";
import type { BlogRecord } from "../types/blog.types";

export interface PaginatedResult<T> {
  items: T[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

export interface BlogRepositoryContract {
  paginate(options: QueryOptions): Promise<PaginatedResult<BlogRecord>>;
  findById(id: number): Promise<BlogRecord | null>;
  findBySlug(slug: string): Promise<BlogRecord | null>;
  create(data: CreateBlogDto): Promise<BlogRecord>;
  update(id: number, data: UpdateBlogDto): Promise<BlogRecord>;
  softDelete(id: number): Promise<BlogRecord>;
}
