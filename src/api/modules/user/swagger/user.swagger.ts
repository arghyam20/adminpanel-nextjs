import { USERS_RESOURCE } from "../constants/user.constants";

const tag = "Users";

export const userSwagger = {
  tag,
  resource: USERS_RESOURCE,
  paths: {
    "/api/v1/users": {
      get: {
        tags: [tag],
        summary: "List users",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "pageSize", in: "query", schema: { type: "integer", default: 10 } },
          { name: "search", in: "query", schema: { type: "string" } },
          { name: "status", in: "query", schema: { type: "string", enum: ["ACTIVE", "INACTIVE"] } },
          {
            name: "id",
            in: "query",
            description: "Fetch single user by id",
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Users list" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
        },
      },
      post: {
        tags: [tag],
        summary: "Create user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password", "roleId"],
                properties: {
                  name: { type: "string", minLength: 2, maxLength: 100 },
                  email: { type: "string", format: "email" },
                  password: { type: "string", minLength: 8 },
                  phone: { type: "string" },
                  roleId: { type: "integer" },
                  status: { type: "string", enum: ["ACTIVE", "INACTIVE"] },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "User created" },
          409: { description: "Email already in use" },
          422: { description: "Validation error" },
        },
      },
      put: {
        tags: [tag],
        summary: "Update user",
        parameters: [{ name: "id", in: "query", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object" } } },
        },
        responses: { 200: { description: "User updated" }, 404: { description: "Not found" } },
      },
      delete: {
        tags: [tag],
        summary: "Soft delete user",
        parameters: [{ name: "id", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "User deleted" } },
      },
    },
  },
};
