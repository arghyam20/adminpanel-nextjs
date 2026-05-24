import type { CategoryController } from "../controller/category.controller";
import { CATEGORIES_RESOURCE } from "../constants/category.constants";

export function createCategoryRoutes(controller: CategoryController) {
  return {
    resource: CATEGORIES_RESOURCE,
    controller
  };
}
