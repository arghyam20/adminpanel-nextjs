import express from "express";
import routes from "./routes/index";
import swaggerRouter from "./docs/swagger";
import { errorHandler } from "./middleware/error.middleware";

const createServer = () => {
  const app = express();
  app.use(express.json());

  // API routes
  app.use("/api", routes);

  // Swagger UI
  app.use("/api/docs", swaggerRouter);

  // Error handler (last)
  app.use(errorHandler);

  return app;
};

if (require.main === module) {
  const port = process.env.PORT || 4000;
  const app = createServer();
  app.listen(port, () => console.log(`API server listening on http://localhost:${port}`));
}

export default createServer;
