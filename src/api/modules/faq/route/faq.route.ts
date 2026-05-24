import { FAQS_RESOURCE } from "../constants/faq.constants";

import type { FaqController } from "../controller/faq.controller";

export function createFaqRoutes(controller: FaqController) {
  return {
    resource: FAQS_RESOURCE,
    controller
  };
}
