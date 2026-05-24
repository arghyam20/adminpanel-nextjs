import { SERVICES_RESOURCE } from "../constants/service.constants";

import type { ServiceController } from "../controller/service.controller";

export function createServiceRoutes(controller: ServiceController) {
  return {
    resource: SERVICES_RESOURCE,
    controller
  };
}
