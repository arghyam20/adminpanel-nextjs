import type { CreateBlogDto, UpdateBlogDto } from "../dto/blog.dto";

export interface BlogRepositoryContract {
  create(data: CreateBlogDto): Promise<unknown>;
  update(id: number, data: UpdateBlogDto): Promise<unknown>;
  findById(id: number): Promise<unknown | null>;
  softDelete(id: number): Promise<unknown>;
}
