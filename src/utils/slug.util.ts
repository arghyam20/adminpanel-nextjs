import slugify from "slugify";

export function generateSlug(value: string, fallback = "item") {
  const slug = slugify(value, {
    lower: true,
    strict: true,
    trim: true,
  });

  return slug || fallback;
}

export function generateUniqueSlug(value: string, suffix?: string | number) {
  const slug = generateSlug(value);
  return suffix ? `${slug}-${suffix}` : slug;
}
