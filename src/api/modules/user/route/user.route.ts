import type { UserController } from "../controller/user.controller";
import { USERS_RESOURCE } from "../constants/user.constants";

export function createUserRoutes(controller: UserController) {
  return {
    resource: USERS_RESOURCE,
    controller
  };
}
