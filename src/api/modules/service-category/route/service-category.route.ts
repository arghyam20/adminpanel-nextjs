import { SERVICECATEGORIES_RESOURCE } from "../constants/service-category.constants";

import type { ServiceCategoryController } from "../controller/service-category.controller";

export function createServiceCategoryRoutes(controller: ServiceCategoryController) {
  return {
    resource: SERVICECATEGORIES_RESOURCE,
    controller
  };
}
