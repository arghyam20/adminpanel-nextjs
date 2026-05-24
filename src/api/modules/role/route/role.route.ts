import type { RoleController } from "../controller/role.controller";
import { ROLES_RESOURCE } from "../constants/role.constants";

export function createRoleRoutes(controller: RoleController) {
  return {
    resource: ROLES_RESOURCE,
    controller
  };
}
