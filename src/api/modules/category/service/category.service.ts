import { makeSlug } from "@/lib/slug";
import type { QueryOptions } from "@/types";
import type { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";
import type { CategoryRepositoryContract } from "../interfaces/category.interface";

export class CategoryService {
  constructor(private readonly repository: CategoryRepositoryContract) {}
  paginate(options: QueryOptions) {
    return this.repository.paginate(options);
  }
  async findById(id: number) {
    const record = await this.repository.findById(id);
    if (!record) throw Object.assign(new Error("Category not found"), { statusCode: 404 });
    return record;
  }
  async create(data: CreateCategoryDto) {
    const slug = data.slug || makeSlug(data.name);
    const existing = await this.repository.findBySlug(slug);
    if (existing) throw Object.assign(new Error("Category already exists"), { statusCode: 409 });
    return this.repository.create({ ...data, slug });
  }
  async update(id: number, data: UpdateCategoryDto) {
    await this.findById(id);
    const slug = data.name ? data.slug || makeSlug(data.name) : data.slug;
    return this.repository.update(id, slug ? { ...data, slug } : data);
  }
  async softDelete(id: number) {
    await this.findById(id);
    return this.repository.softDelete(id);
  }
}
