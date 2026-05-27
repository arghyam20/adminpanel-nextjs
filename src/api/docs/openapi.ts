export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AdminPanel API",
      version: "1.0.0",
      description: "Modular API for the AdminPanel Next.js application",
    },
    servers: [{ url: "http://localhost:4000/api/v1" }],
  },
  // Path globs for JSDoc-style annotations or route files
  apis: [__dirname + "/../routes/**/*.ts", __dirname + "/../controllers/**/*.ts"],
};
