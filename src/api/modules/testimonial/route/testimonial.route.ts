import { TESTIMONIALS_RESOURCE } from "../constants/testimonial.constants";

import type { TestimonialController } from "../controller/testimonial.controller";

export function createTestimonialRoutes(controller: TestimonialController) {
  return {
    resource: TESTIMONIALS_RESOURCE,
    controller,
  };
}
