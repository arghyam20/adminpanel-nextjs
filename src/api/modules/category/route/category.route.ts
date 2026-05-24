import { CATEGORIES_RESOURCE } from "../constants/category.constants";

import type { CategoryController } from "../controller/category.controller";

export function createCategoryRoutes(controller: CategoryController) {
  return {
    resource: CATEGORIES_RESOURCE,
    controller
  };
}
