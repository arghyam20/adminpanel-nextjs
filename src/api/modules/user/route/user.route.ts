import { UserController } from "../controller/user.controller";
import { UserRepository } from "../repository/user.repository";
import { UserService } from "../service/user.service";

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

export const userHandlers = {
  GET: controller.list.bind(controller),
  POST: controller.create.bind(controller),
  PUT: controller.update.bind(controller),
  DELETE: controller.remove.bind(controller),
};
