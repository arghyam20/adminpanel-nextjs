import { blogSwagger } from "@/api/modules/blog/swagger/blog.swagger";
import { categorySwagger } from "@/api/modules/category/swagger/category.swagger";
import { faqSwagger } from "@/api/modules/faq/swagger/faq.swagger";
import { roleSwagger } from "@/api/modules/role/swagger/role.swagger";
import { serviceCategorySwagger } from "@/api/modules/service-category/swagger/service-category.swagger";
import { serviceSwagger } from "@/api/modules/service/swagger/service.swagger";
import { testimonialSwagger } from "@/api/modules/testimonial/swagger/testimonial.swagger";
import { userSwagger } from "@/api/modules/user/swagger/user.swagger";
import { ok } from "@/lib/api-response";

const modules = [
  roleSwagger,
  userSwagger,
  categorySwagger,
  blogSwagger,
  faqSwagger,
  testimonialSwagger,
  serviceCategorySwagger,
  serviceSwagger,
];

const paths = modules.reduce((acc, mod) => ({ ...acc, ...mod.paths }), {} as Record<string, unknown>);
const tags = modules.map((mod) => ({ name: mod.tag }));

export async function GET() {
  return ok(
    {
      openapi: "3.1.0",
      info: { title: "Admin Panel API", version: "1.0.0" },
      tags,
      paths,
      components: {
        securitySchemes: {
          cookieAuth: { type: "apiKey", in: "cookie", name: "token" },
        },
      },
      security: [{ cookieAuth: [] }],
    },
    "OpenAPI document"
  );
}
