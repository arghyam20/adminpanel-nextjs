import { TESTIMONIALS_RESOURCE } from "../constants/testimonial.constants";

const tag = "Testimonials";

export const testimonialSwagger = {
  tag,
  resource: TESTIMONIALS_RESOURCE,
  paths: {
    "/api/v1/testimonials": {
      get: {
        tags: [tag],
        summary: "List testimonials",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "pageSize", in: "query", schema: { type: "integer", default: 10 } },
          { name: "search", in: "query", schema: { type: "string" } },
          { name: "status", in: "query", schema: { type: "string", enum: ["ACTIVE", "INACTIVE"] } },
          { name: "id", in: "query", description: "Fetch single testimonial by id", schema: { type: "integer" } },
        ],
        responses: { 200: { description: "Testimonials list" }, 401: { description: "Unauthorized" }, 403: { description: "Forbidden" } },
      },
      post: {
        tags: [tag],
        summary: "Create testimonial",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["clientName", "content"],
                properties: {
                  clientName: { type: "string" },
                  designation: { type: "string" },
                  company: { type: "string" },
                  content: { type: "string" },
                  rating: { type: "integer", minimum: 1, maximum: 5 },
                  avatar: { type: "string" },
                  status: { type: "string", enum: ["ACTIVE", "INACTIVE"] },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Testimonial created" }, 422: { description: "Validation error" } },
      },
      put: {
        tags: [tag],
        summary: "Update testimonial",
        parameters: [{ name: "id", in: "query", required: true, schema: { type: "integer" } }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Testimonial updated" }, 404: { description: "Not found" } },
      },
      delete: {
        tags: [tag],
        summary: "Soft delete testimonial",
        parameters: [{ name: "id", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Testimonial deleted" } },
      },
    },
  },
};
