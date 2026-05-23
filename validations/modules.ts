import { z } from "zod";
import { statusSchema } from "@/validations/common";

export const roleSchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  description: z.string().optional().nullable(),
  permissions: z.record(z.array(z.string())).default({}),
  status: statusSchema.default("ACTIVE")
});

export const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8).optional(),
  phone: z.string().optional().nullable(),
  profileImage: z.string().optional().nullable(),
  roleId: z.coerce.number().int().positive(),
  status: statusSchema.default("ACTIVE")
});

export const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  status: statusSchema.default("ACTIVE")
});

export const faqSchema = z.object({
  question: z.string().min(3),
  answer: z.string().min(3),
  ordering: z.coerce.number().int().default(0),
  status: statusSchema.default("ACTIVE")
});

export const testimonialSchema = z.object({
  clientName: z.string().min(2),
  designation: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  content: z.string().min(3),
  status: statusSchema.default("ACTIVE")
});

export const blogSchema = z.object({
  title: z.string().min(3),
  slug: z.string().optional(),
  excerpt: z.string().optional().nullable(),
  content: z.string().min(3),
  featuredImage: z.string().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  status: statusSchema.default("DRAFT"),
  categoryId: z.coerce.number().int().positive(),
  authorId: z.coerce.number().int().positive()
});

export const serviceCategorySchema = categorySchema;

export const serviceSchema = z.object({
  title: z.string().min(3),
  slug: z.string().optional(),
  description: z.string().min(3),
  image: z.string().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  status: statusSchema.default("ACTIVE"),
  categoryId: z.coerce.number().int().positive()
});
