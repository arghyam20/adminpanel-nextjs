import { FAQS_RESOURCE } from "../constants/faq.constants";

const tag = "FAQs";

export const faqSwagger = {
  tag,
  resource: FAQS_RESOURCE,
  paths: {
    "/api/v1/faqs": {
      get: {
        tags: [tag],
        summary: "List FAQs",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "pageSize", in: "query", schema: { type: "integer", default: 10 } },
          { name: "search", in: "query", schema: { type: "string" } },
          { name: "status", in: "query", schema: { type: "string", enum: ["ACTIVE", "INACTIVE"] } },
          {
            name: "id",
            in: "query",
            description: "Fetch single FAQ by id",
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "FAQs list" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
        },
      },
      post: {
        tags: [tag],
        summary: "Create FAQ",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["question", "answer"],
                properties: {
                  question: { type: "string" },
                  answer: { type: "string" },
                  ordering: { type: "integer", default: 0 },
                  status: { type: "string", enum: ["ACTIVE", "INACTIVE"] },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "FAQ created" },
          422: { description: "Validation error" },
        },
      },
      put: {
        tags: [tag],
        summary: "Update FAQ",
        parameters: [{ name: "id", in: "query", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object" } } },
        },
        responses: { 200: { description: "FAQ updated" }, 404: { description: "Not found" } },
      },
      delete: {
        tags: [tag],
        summary: "Soft delete FAQ",
        parameters: [{ name: "id", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "FAQ deleted" } },
      },
    },
  },
};
