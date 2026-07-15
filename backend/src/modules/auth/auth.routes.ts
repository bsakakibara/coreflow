import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login", (req, res, next) => {
    return authController.login(req, res, next);
});

authRoutes.post("/me", authMiddleware, (req, res, next) => {
    return authController.me(req, res, next);
});

export { authRoutes };
