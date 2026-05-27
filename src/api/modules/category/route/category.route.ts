import { CategoryController } from "../controller/category.controller";
import { CategoryRepository } from "../repository/category.repository";
import { CategoryService } from "../service/category.service";
const repository = new CategoryRepository();
const service = new CategoryService(repository);
const controller = new CategoryController(service);
export const categoryHandlers = {
  GET: controller.list.bind(controller),
  POST: controller.create.bind(controller),
  PUT: controller.update.bind(controller),
  DELETE: controller.remove.bind(controller),
};
