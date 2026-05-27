import { SERVICECATEGORIES_RESOURCE } from "../constants/service-category.constants";

const tag = "Service Categories";

export const serviceCategorySwagger = {
  tag,
  resource: SERVICECATEGORIES_RESOURCE,
  paths: {
    "/api/v1/service-categories": {
      get: {
        tags: [tag],
        summary: "List service categories",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "pageSize", in: "query", schema: { type: "integer", default: 10 } },
          { name: "search", in: "query", schema: { type: "string" } },
          { name: "status", in: "query", schema: { type: "string", enum: ["ACTIVE", "INACTIVE"] } },
          { name: "id", in: "query", description: "Fetch single service category by id", schema: { type: "integer" } },
        ],
        responses: { 200: { description: "Service categories list" }, 401: { description: "Unauthorized" }, 403: { description: "Forbidden" } },
      },
      post: {
        tags: [tag],
        summary: "Create service category",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string", minLength: 2, maxLength: 100 },
                  slug: { type: "string" },
                  description: { type: "string" },
                  featuredImage: { type: "string" },
                  status: { type: "string", enum: ["ACTIVE", "INACTIVE"] },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Service category created" }, 409: { description: "Already exists" }, 422: { description: "Validation error" } },
      },
      put: {
        tags: [tag],
        summary: "Update service category",
        parameters: [{ name: "id", in: "query", required: true, schema: { type: "integer" } }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Service category updated" }, 404: { description: "Not found" } },
      },
      delete: {
        tags: [tag],
        summary: "Soft delete service category",
        parameters: [{ name: "id", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Service category deleted" } },
      },
    },
  },
};
