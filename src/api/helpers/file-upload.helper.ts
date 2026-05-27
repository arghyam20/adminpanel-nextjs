import { AppError } from "./error.helper";

export interface FileUploadOptions {
  maxSizeMb?: number;
  allowedTypes?: string[];
}

export async function getUploadedFile(
  formData: FormData,
  fieldName = "file",
  options: FileUploadOptions = {}
) {
  const file = formData.get(fieldName);
  if (!(file instanceof File)) {
    throw new AppError("File is required", 422);
  }

  const maxSize = (options.maxSizeMb ?? 5) * 1024 * 1024;
  if (file.size > maxSize) {
    throw new AppError(`File size must be under ${options.maxSizeMb ?? 5}MB`, 422);
  }

  if (options.allowedTypes?.length && !options.allowedTypes.includes(file.type)) {
    throw new AppError("File type is not allowed", 422, {
      allowedTypes: options.allowedTypes,
    });
  }

  return file;
}

export function getSafeFileName(fileName: string) {
  const extension = fileName.split(".").pop();
  const baseName = fileName
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${baseName || "file"}-${Date.now()}${extension ? `.${extension}` : ""}`;
}
