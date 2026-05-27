import { z } from "zod";

import { statusSchema } from "@/validations/common";

export const roleSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().max(100).optional(),
  description: z.string().max(500).optional().nullable(),
  permissions: z.record(z.array(z.string())).default({}),
  status: statusSchema.default("ACTIVE"),
});

export const userSchema = z.object({
  name: z.string().min(2).max(150),
  email: z.string().email().max(200),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[0-9]/, "Must contain number")
    .optional(),
  phone: z.string().max(20).optional().nullable(),
  profileImage: z.string().max(500).optional().nullable(),
  roleId: z.coerce.number().int().positive(),
  status: statusSchema.default("ACTIVE"),
});

export const categorySchema = z.object({
  name: z.string().min(2).max(150),
  slug: z.string().max(180).optional(),
  status: statusSchema.default("ACTIVE"),
});

export const faqSchema = z.object({
  question: z.string().min(3).max(500),
  answer: z.string().min(3),
  ordering: z.coerce.number().int().min(0).default(0),
  status: statusSchema.default("ACTIVE"),
});

export const testimonialSchema = z.object({
  clientName: z.string().min(2).max(150),
  designation: z.string().max(150).optional().nullable(),
  company: z.string().max(150).optional().nullable(),
  image: z.string().max(500).optional().nullable(),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  content: z.string().min(3),
  status: statusSchema.default("ACTIVE"),
});

export const blogSchema = z.object({
  title: z.string().min(3).max(300),
  slug: z.string().max(350).optional(),
  excerpt: z.string().optional().nullable(),
  content: z.string().min(3),
  featuredImage: z.string().max(500).optional().nullable(),
  metaTitle: z.string().max(160).optional().nullable(),
  metaDescription: z.string().max(320).optional().nullable(),
  tags: z.array(z.string()).default([]),
  status: statusSchema.default("ACTIVE"),
  publishedAt: z.coerce.date().optional().nullable(),
  categoryId: z.coerce.number().int().positive(),
  authorId: z.coerce.number().int().positive(),
});

export const serviceCategorySchema = z.object({
  name: z.string().min(2).max(150),
  slug: z.string().max(180).optional(),
  description: z.string().optional().nullable(),
  image: z.string().max(500).optional().nullable(),
  status: statusSchema.default("ACTIVE"),
});

export const serviceSchema = z.object({
  title: z.string().min(3).max(300),
  slug: z.string().max(350).optional(),
  shortDesc: z.string().max(500).optional().nullable(),
  description: z.string().min(3),
  image: z.string().max(500).optional().nullable(),
  metaTitle: z.string().max(160).optional().nullable(),
  metaDescription: z.string().max(320).optional().nullable(),
  ordering: z.coerce.number().int().min(0).default(0),
  status: statusSchema.default("ACTIVE"),
  categoryId: z.coerce.number().int().positive(),
});
