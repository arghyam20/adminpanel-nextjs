import { SERVICES_RESOURCE } from "../constants/service.constants";

const tag = "Services";

export const serviceSwagger = {
  tag,
  resource: SERVICES_RESOURCE,
  paths: {
    "/api/v1/services": {
      get: {
        tags: [tag],
        summary: "List services",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "pageSize", in: "query", schema: { type: "integer", default: 10 } },
          { name: "search", in: "query", schema: { type: "string" } },
          { name: "status", in: "query", schema: { type: "string", enum: ["ACTIVE", "INACTIVE"] } },
          { name: "id", in: "query", description: "Fetch single service by id", schema: { type: "integer" } },
        ],
        responses: { 200: { description: "Services list" }, 401: { description: "Unauthorized" }, 403: { description: "Forbidden" } },
      },
      post: {
        tags: [tag],
        summary: "Create service",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title"],
                properties: {
                  title: { type: "string" },
                  slug: { type: "string" },
                  shortDesc: { type: "string" },
                  content: { type: "string" },
                  featuredImage: { type: "string" },
                  metaTitle: { type: "string" },
                  metaDescription: { type: "string" },
                  ordering: { type: "integer", default: 0 },
                  status: { type: "string", enum: ["ACTIVE", "INACTIVE"] },
                  categoryId: { type: "integer" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Service created" }, 409: { description: "Slug already exists" }, 422: { description: "Validation error" } },
      },
      put: {
        tags: [tag],
        summary: "Update service",
        parameters: [{ name: "id", in: "query", required: true, schema: { type: "integer" } }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Service updated" }, 404: { description: "Not found" } },
      },
      delete: {
        tags: [tag],
        summary: "Soft delete service",
        parameters: [{ name: "id", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Service deleted" } },
      },
    },
  },
};
