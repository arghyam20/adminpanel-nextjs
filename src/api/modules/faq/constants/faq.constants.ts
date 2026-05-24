export const FAQS_RESOURCE = "faqs";

export const FAQS_PERMISSIONS = ["create", "read", "update", "delete"] as const;

export type FaqPermission = (typeof FAQS_PERMISSIONS)[number];
