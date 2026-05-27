import express from "express";
import userRoutes from "./user.routes";

const router = express.Router();

// Versioned mount
router.use("/v1/users", userRoutes);

export default router;
