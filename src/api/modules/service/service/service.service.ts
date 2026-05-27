import { makeSlug } from "@/lib/slug";
import type { QueryOptions } from "@/types";
import type { CreateServiceDto, UpdateServiceDto } from "../dto/service.dto";
import type { ServiceRepository } from "../repository/service.repository";

export class ServiceService {
  constructor(private readonly repository: ServiceRepository) {}
  paginate(options: QueryOptions) { return this.repository.paginate(options); }
  async findById(id: number) {
    const record = await this.repository.findById(id);
    if (!record) throw Object.assign(new Error("Service not found"), { statusCode: 404 });
    return record;
  }
  async create(data: CreateServiceDto) {
    const slug = data.slug || makeSlug(data.title);
    const existing = await this.repository.findBySlug(slug);
    if (existing) throw Object.assign(new Error("Service slug already exists"), { statusCode: 409 });
    return this.repository.create({ ...data, slug });
  }
  async update(id: number, data: UpdateServiceDto) {
    await this.findById(id);
    const slug = data.title ? (data.slug || makeSlug(data.title)) : data.slug;
    return this.repository.update(id, slug ? { ...data, slug } : data);
  }
  async softDelete(id: number) { await this.findById(id); return this.repository.softDelete(id); }
}
