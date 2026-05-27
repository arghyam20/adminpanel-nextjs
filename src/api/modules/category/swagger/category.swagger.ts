import { CATEGORIES_RESOURCE } from "../constants/category.constants";

const tag = "Categories";

export const categorySwagger = {
  tag,
  resource: CATEGORIES_RESOURCE,
  paths: {
    "/api/v1/categories": {
      get: {
        tags: [tag],
        summary: "List categories",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "pageSize", in: "query", schema: { type: "integer", default: 10 } },
          { name: "search", in: "query", schema: { type: "string" } },
          { name: "status", in: "query", schema: { type: "string", enum: ["ACTIVE", "INACTIVE"] } },
          { name: "id", in: "query", description: "Fetch single category by id", schema: { type: "integer" } },
        ],
        responses: { 200: { description: "Categories list" }, 401: { description: "Unauthorized" }, 403: { description: "Forbidden" } },
      },
      post: {
        tags: [tag],
        summary: "Create category",
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
                  status: { type: "string", enum: ["ACTIVE", "INACTIVE"] },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Category created" }, 409: { description: "Category already exists" }, 422: { description: "Validation error" } },
      },
      put: {
        tags: [tag],
        summary: "Update category",
        parameters: [{ name: "id", in: "query", required: true, schema: { type: "integer" } }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Category updated" }, 404: { description: "Not found" } },
      },
      delete: {
        tags: [tag],
        summary: "Soft delete category",
        parameters: [{ name: "id", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Category deleted" } },
      },
    },
  },
};
