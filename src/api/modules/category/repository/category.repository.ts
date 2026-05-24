import type { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";
import type { CategoryRepositoryContract } from "../interfaces/category.interface";

export class CategoryRepository implements CategoryRepositoryContract {
  async create(_data: CreateCategoryDto): Promise<unknown> {
    throw new Error("CategoryRepository.create is not implemented yet.");
  }

  async update(_id: number, _data: UpdateCategoryDto): Promise<unknown> {
    throw new Error("CategoryRepository.update is not implemented yet.");
  }

  async findById(_id: number): Promise<unknown | null> {
    throw new Error("CategoryRepository.findById is not implemented yet.");
  }

  async softDelete(_id: number): Promise<unknown> {
    throw new Error("CategoryRepository.softDelete is not implemented yet.");
  }
}
