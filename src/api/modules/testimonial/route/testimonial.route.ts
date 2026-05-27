import { TestimonialController } from "../controller/testimonial.controller";
import { TestimonialRepository } from "../repository/testimonial.repository";
import { TestimonialService } from "../service/testimonial.service";
const repository = new TestimonialRepository();
const service = new TestimonialService(repository);
const controller = new TestimonialController(service);
export const testimonialHandlers = {
  GET: controller.list.bind(controller),
  POST: controller.create.bind(controller),
  PUT: controller.update.bind(controller),
  DELETE: controller.remove.bind(controller),
};
