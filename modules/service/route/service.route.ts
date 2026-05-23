import type { ServiceController } from "../controller/service.controller";
import { SERVICES_RESOURCE } from "../constants/service.constants";

export function createServiceRoutes(controller: ServiceController) {
  return {
    resource: SERVICES_RESOURCE,
    controller
  };
}
