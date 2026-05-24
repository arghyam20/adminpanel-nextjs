import type { CreateBlogDto, UpdateBlogDto } from "../dto/blog.dto";
import type { BlogRepositoryContract } from "../interfaces/blog.interface";

export class BlogRepository implements BlogRepositoryContract {
  async create(_data: CreateBlogDto): Promise<unknown> {
    throw new Error("BlogRepository.create is not implemented yet.");
  }

  async update(_id: number, _data: UpdateBlogDto): Promise<unknown> {
    throw new Error("BlogRepository.update is not implemented yet.");
  }

  async findById(_id: number): Promise<unknown | null> {
    throw new Error("BlogRepository.findById is not implemented yet.");
  }

  async softDelete(_id: number): Promise<unknown> {
    throw new Error("BlogRepository.softDelete is not implemented yet.");
  }
}
