import { ServiceController } from "../controller/service.controller";
import { ServiceRepository } from "../repository/service.repository";
import { ServiceService } from "../service/service.service";
const repository = new ServiceRepository();
const service = new ServiceService(repository);
const controller = new ServiceController(service);
export const serviceHandlers = {
  GET: controller.list.bind(controller),
  POST: controller.create.bind(controller),
  PUT: controller.update.bind(controller),
  DELETE: controller.remove.bind(controller),
};
