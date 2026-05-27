import { ServiceCategoryController } from "../controller/service-category.controller";
import { ServiceCategoryRepository } from "../repository/service-category.repository";
import { ServiceCategoryService } from "../service/service-category.service";
const repository = new ServiceCategoryRepository();
const service = new ServiceCategoryService(repository);
const controller = new ServiceCategoryController(service);
export const serviceCategoryHandlers = {
  GET: controller.list.bind(controller),
  POST: controller.create.bind(controller),
  PUT: controller.update.bind(controller),
  DELETE: controller.remove.bind(controller),
};
