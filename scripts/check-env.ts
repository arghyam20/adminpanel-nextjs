import { env } from "@/config/env";

console.log("Environment loaded", {
  appUrl: env.APP_URL,
  nodeEnv: env.NODE_ENV,
  uploadDir: env.UPLOAD_DIR
});
