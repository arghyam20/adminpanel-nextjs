import type { BlogController } from "../controller/blog.controller";
import { BLOGS_RESOURCE } from "../constants/blog.constants";

export function createBlogRoutes(controller: BlogController) {
  return {
    resource: BLOGS_RESOURCE,
    controller
  };
}
