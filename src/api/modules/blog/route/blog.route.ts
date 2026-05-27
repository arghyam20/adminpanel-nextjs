import { BlogController } from "../controller/blog.controller";
import { BlogRepository } from "../repository/blog.repository";
import { BlogService } from "../service/blog.service";
const repository = new BlogRepository();
const service = new BlogService(repository);
const controller = new BlogController(service);
export const blogHandlers = {
  GET: controller.list.bind(controller),
  POST: controller.create.bind(controller),
  PUT: controller.update.bind(controller),
  DELETE: controller.remove.bind(controller),
};
