import { RoleController } from "../controller/role.controller";
import { RoleRepository } from "../repository/role.repository";
import { RoleService } from "../service/role.service";

const repository = new RoleRepository();
const service = new RoleService(repository);
const controller = new RoleController(service);

export const roleHandlers = {
  GET: (request: Parameters<RoleController["list"]>[0]) =>
    request.nextUrl.searchParams.get("id") ? controller.show(request) : controller.list(request),
  POST: controller.create.bind(controller),
  PUT: controller.update.bind(controller),
  DELETE: controller.remove.bind(controller),
};
