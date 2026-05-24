import type { ServiceCategoryController } from "../controller/service-category.controller";
import { SERVICECATEGORIES_RESOURCE } from "../constants/service-category.constants";

export function createServiceCategoryRoutes(controller: ServiceCategoryController) {
  return {
    resource: SERVICECATEGORIES_RESOURCE,
    controller
  };
}
