export const TESTIMONIALS_RESOURCE = "testimonials";

export const TESTIMONIALS_PERMISSIONS = ["create", "read", "update", "delete"] as const;

export type TestimonialPermission = (typeof TESTIMONIALS_PERMISSIONS)[number];
