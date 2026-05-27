import { makeSlug } from "@/lib/slug";
import type { QueryOptions } from "@/types";
import type { CreateServiceCategoryDto, UpdateServiceCategoryDto } from "../dto/service-category.dto";
import type { ServiceCategoryRepository } from "../repository/service-category.repository";

export class ServiceCategoryService {
  constructor(private readonly repository: ServiceCategoryRepository) {}
  paginate(options: QueryOptions) { return this.repository.paginate(options); }
  async findById(id: number) {
    const record = await this.repository.findById(id);
    if (!record) throw Object.assign(new Error("Service category not found"), { statusCode: 404 });
    return record;
  }
  async create(data: CreateServiceCategoryDto) {
    const slug = data.slug || makeSlug(data.name);
    const existing = await this.repository.findBySlug(slug);
    if (existing) throw Object.assign(new Error("Service category already exists"), { statusCode: 409 });
    return this.repository.create({ ...data, slug });
  }
  async update(id: number, data: UpdateServiceCategoryDto) {
    await this.findById(id);
    const slug = data.name ? (data.slug || makeSlug(data.name)) : data.slug;
    return this.repository.update(id, slug ? { ...data, slug } : data);
  }
  async softDelete(id: number) { await this.findById(id); return this.repository.softDelete(id); }
}
