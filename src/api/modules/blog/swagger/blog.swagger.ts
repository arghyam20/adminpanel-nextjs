import { BLOGS_RESOURCE } from "../constants/blog.constants";

const tag = "Blogs";

export const blogSwagger = {
  tag,
  resource: BLOGS_RESOURCE,
  paths: {
    "/api/v1/blogs": {
      get: {
        tags: [tag],
        summary: "List blogs",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "pageSize", in: "query", schema: { type: "integer", default: 10 } },
          { name: "search", in: "query", schema: { type: "string" } },
          { name: "status", in: "query", schema: { type: "string", enum: ["ACTIVE", "INACTIVE"] } },
          {
            name: "id",
            in: "query",
            description: "Fetch single blog by id",
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Blogs list" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
        },
      },
      post: {
        tags: [tag],
        summary: "Create blog",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "content"],
                properties: {
                  title: { type: "string" },
                  slug: { type: "string" },
                  excerpt: { type: "string" },
                  content: { type: "string" },
                  featuredImage: { type: "string" },
                  metaTitle: { type: "string" },
                  metaDescription: { type: "string" },
                  status: { type: "string", enum: ["ACTIVE", "INACTIVE"] },
                  publishedAt: { type: "string", format: "date-time" },
                  categoryId: { type: "integer" },
                  authorId: { type: "integer" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Blog created" },
          409: { description: "Slug already exists" },
          422: { description: "Validation error" },
        },
      },
      put: {
        tags: [tag],
        summary: "Update blog",
        parameters: [{ name: "id", in: "query", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object" } } },
        },
        responses: { 200: { description: "Blog updated" }, 404: { description: "Not found" } },
      },
      delete: {
        tags: [tag],
        summary: "Soft delete blog",
        parameters: [{ name: "id", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Blog deleted" } },
      },
    },
  },
};
