import { USERS_RESOURCE } from "../constants/user.constants";

import type { UserController } from "../controller/user.controller";

export function createUserRoutes(controller: UserController) {
  return {
    resource: USERS_RESOURCE,
    controller
  };
}
