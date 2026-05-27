import { makeSlug } from "@/lib/slug";
import type { QueryOptions } from "@/types";
import type { CreateBlogDto, UpdateBlogDto } from "../dto/blog.dto";
import type { BlogRepository } from "../repository/blog.repository";

export class BlogService {
  constructor(private readonly repository: BlogRepository) {}
  paginate(options: QueryOptions) { return this.repository.paginate(options); }
  async findById(id: number) {
    const record = await this.repository.findById(id);
    if (!record) throw Object.assign(new Error("Blog not found"), { statusCode: 404 });
    return record;
  }
  async create(data: CreateBlogDto) {
    const slug = data.slug || makeSlug(data.title);
    const existing = await this.repository.findBySlug(slug);
    if (existing) throw Object.assign(new Error("Blog slug already exists"), { statusCode: 409 });
    const publishedAt = data.status === "ACTIVE" ? (data.publishedAt ?? new Date()) : data.publishedAt;
    return this.repository.create({ ...data, slug, publishedAt });
  }
  async update(id: number, data: UpdateBlogDto) {
    await this.findById(id);
    const slug = data.title ? (data.slug || makeSlug(data.title)) : data.slug;
    return this.repository.update(id, slug ? { ...data, slug } : data);
  }
  async softDelete(id: number) { await this.findById(id); return this.repository.softDelete(id); }
}
