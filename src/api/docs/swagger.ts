import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOptions } from "./openapi";

const router = express.Router();

const swaggerSpec = swaggerJSDoc(swaggerOptions as any);

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
