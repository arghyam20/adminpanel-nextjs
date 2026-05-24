import { ROLES_RESOURCE } from "../constants/role.constants";

import type { RoleController } from "../controller/role.controller";

export function createRoleRoutes(controller: RoleController) {
  return {
    resource: ROLES_RESOURCE,
    controller,
  };
}
