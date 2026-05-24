import type { TestimonialController } from "../controller/testimonial.controller";
import { TESTIMONIALS_RESOURCE } from "../constants/testimonial.constants";

export function createTestimonialRoutes(controller: TestimonialController) {
  return {
    resource: TESTIMONIALS_RESOURCE,
    controller
  };
}
