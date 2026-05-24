import type { CreateBlogDto, UpdateBlogDto } from "../dto/blog.dto";
import type { BlogRepositoryContract } from "../interfaces/blog.interface";

export class BlogService {
  constructor(private readonly repository: BlogRepositoryContract) {}

  create(data: CreateBlogDto) {
    return this.repository.create(data);
  }

  update(id: number, data: UpdateBlogDto) {
    return this.repository.update(id, data);
  }

  findById(id: number) {
    return this.repository.findById(id);
  }

  softDelete(id: number) {
    return this.repository.softDelete(id);
  }
}
