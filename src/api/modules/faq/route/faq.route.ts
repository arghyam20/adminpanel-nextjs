import { FaqController } from "../controller/faq.controller";
import { FaqRepository } from "../repository/faq.repository";
import { FaqService } from "../service/faq.service";
const repository = new FaqRepository();
const service = new FaqService(repository);
const controller = new FaqController(service);
export const faqHandlers = {
  GET: controller.list.bind(controller),
  POST: controller.create.bind(controller),
  PUT: controller.update.bind(controller),
  DELETE: controller.remove.bind(controller),
};
