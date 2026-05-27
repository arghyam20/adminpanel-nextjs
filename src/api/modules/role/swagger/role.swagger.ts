import { ROLES_RESOURCE } from "../constants/role.constants";

const tag = "Roles";

export const roleSwagger = {
  tag,
  resource: ROLES_RESOURCE,
  paths: {
    "/api/v1/roles": {
      get: {
        tags: [tag],
        summary: "List roles",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "pageSize", in: "query", schema: { type: "integer", default: 10 } },
          { name: "search", in: "query", schema: { type: "string" } },
          { name: "status", in: "query", schema: { type: "string", enum: ["ACTIVE", "INACTIVE"] } },
          { name: "id", in: "query", description: "Fetch single role by id", schema: { type: "integer" } },
        ],
        responses: {
          200: { description: "Roles list" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
        },
      },
      post: {
        tags: [tag],
        summary: "Create role",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "permissions"],
                properties: {
                  name: { type: "string", minLength: 2, maxLength: 100 },
                  slug: { type: "string" },
                  description: { type: "string" },
                  permissions: { type: "object", additionalProperties: { type: "array", items: { type: "string" } } },
                  status: { type: "string", enum: ["ACTIVE", "INACTIVE"] },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Role created" },
          409: { description: "Role name already exists" },
          422: { description: "Validation error" },
        },
      },
      put: {
        tags: [tag],
        summary: "Update role",
        parameters: [{ name: "id", in: "query", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object" } } },
        },
        responses: { 200: { description: "Role updated" }, 404: { description: "Not found" } },
      },
      delete: {
        tags: [tag],
        summary: "Soft delete role",
        parameters: [{ name: "id", in: "query", required: true, schema: { type: "integer" } }],
        responses: {
          200: { description: "Role deleted" },
          409: { description: "Role has active users" },
        },
      },
    },
  },
};
