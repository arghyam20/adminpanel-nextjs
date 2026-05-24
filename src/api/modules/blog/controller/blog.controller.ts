import type { CreateBlogDto, UpdateBlogDto } from "../dto/blog.dto";
import type { BlogService } from "../service/blog.service";

export class BlogController {
  constructor(private readonly service: BlogService) {}

  create(data: CreateBlogDto) {
    return this.service.create(data);
  }

  update(id: number, data: UpdateBlogDto) {
    return this.service.update(id, data);
  }

  findById(id: number) {
    return this.service.findById(id);
  }

  softDelete(id: number) {
    return this.service.softDelete(id);
  }
}
