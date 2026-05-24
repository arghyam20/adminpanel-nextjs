import type { FaqController } from "../controller/faq.controller";
import { FAQS_RESOURCE } from "../constants/faq.constants";

export function createFaqRoutes(controller: FaqController) {
  return {
    resource: FAQS_RESOURCE,
    controller
  };
}
