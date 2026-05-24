import { ok } from "@/lib/api-response";

const paths = [
  "/api/v1/auth/login",
  "/api/v1/auth/logout",
  "/api/v1/auth/forgot-password",
  "/api/v1/auth/reset-password",
  "/api/v1/roles",
  "/api/v1/users",
  "/api/v1/categories",
  "/api/v1/faqs",
  "/api/v1/testimonials",
  "/api/v1/blogs",
  "/api/v1/service-categories",
  "/api/v1/services",
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
            delete: {
              summary: `Soft delete ${path}?id=`,
              responses: { "200": { description: "OK" } },
            },
          },
        ])
      ),
    },
    "OpenAPI document"
  );
}
