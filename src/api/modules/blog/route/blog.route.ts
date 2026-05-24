import { BLOGS_RESOURCE } from "../constants/blog.constants";

import type { BlogController } from "../controller/blog.controller";

export function createBlogRoutes(controller: BlogController) {
  return {
    resource: BLOGS_RESOURCE,
    controller
  };
}
