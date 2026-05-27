import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { makeSlug } from "@/lib/slug";
import { BaseRepository } from "@/repositories/base-repository";

export const roleRepository = new BaseRepository(prisma.role, ["name", "slug", "description"]);
export const categoryRepository = new BaseRepository(prisma.category, ["name", "slug"]);
export const faqRepository = new BaseRepository(prisma.faq, ["question", "answer"]);
export const testimonialRepository = new BaseRepository(prisma.testimonial, [
  "clientName",
  "designation",
  "content",
]);
export const blogRepository = new BaseRepository(prisma.blog, [
  "title",
  "slug",
  "excerpt",
  "metaTitle",
]);
export const serviceCategoryRepository = new BaseRepository(prisma.serviceCategory, [
  "name",
  "slug",
]);
export const serviceRepository = new BaseRepository(prisma.service, [
  "title",
  "slug",
  "description",
  "metaTitle",
]);

export const userRepository = {
  paginate: (options: Parameters<BaseRepository<object, object>["paginate"]>[0]) =>
    new BaseRepository(prisma.user, ["name", "email", "phone"]).paginate(options, { role: true }),
  findById: (id: number) =>
    prisma.user.findFirst({ where: { id, isDeleted: false }, include: { role: true } }),
  create: async (data: Record<string, unknown>) =>
    prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(String(data.password ?? "ChangeMe@123"), 12),
      } as never,
    }),
  update: async (id: number, data: Record<string, unknown>) => {
    const updateData = { ...data };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(String(updateData.password), 12);
    } else {
      delete updateData.password;
    }
    return prisma.user.update({ where: { id }, data: updateData as never });
  },
  softDelete: (id: number) => prisma.user.update({ where: { id }, data: { isDeleted: true } }),
};

export function withSlug<T extends { name?: string; title?: string; slug?: string }>(data: T) {
  const base = data.slug || data.name || data.title || "";
  return { ...data, slug: makeSlug(base) };
}
