import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  COOKIE_SECRET: z.string().min(32),
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:3000/api/v1"),
  APP_URL: z.string().url().default("https://localhost:3000"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  UPLOAD_DIR: z.string().default("public/uploads")
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  APP_URL: process.env.APP_URL,
  NODE_ENV: process.env.NODE_ENV,
  UPLOAD_DIR: process.env.UPLOAD_DIR
});
