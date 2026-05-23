import { ok } from "@/lib/api-response";

const paths = [
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/api/roles",
  "/api/users",
  "/api/categories",
  "/api/faqs",
  "/api/testimonials",
  "/api/blogs",
  "/api/service-categories",
  "/api/services"
];

export async function GET() {
  return ok(
    {
      openapi: "3.1.0",
      info: { title: "Admin Panel API", version: "1.0.0" },
      paths: Object.fromEntries(
        paths.map((path) => [
          path,
          {
            get: { summary: `List ${path}`, responses: { "200": { description: "OK" } } },
            post: { summary: `Create ${path}`, responses: { "201": { description: "Created" } } },
            put: { summary: `Update ${path}?id=`, responses: { "200": { description: "OK" } } },
            delete: { summary: `Soft delete ${path}?id=`, responses: { "200": { description: "OK" } } }
          }
        ])
      )
    },
    "OpenAPI document"
  );
}
