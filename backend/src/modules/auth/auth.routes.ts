import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validateForgotPassword, validateResetPassword } from "../../middlewares/validate-password-reset";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login", (req, res, next) => {
    return authController.login(req, res, next);
});

authRoutes.post(
    "/forgot-password",
    validateForgotPassword,
    (req, res, next) => {
        return authController.forgotPassword(req, res, next);
    }
);

authRoutes.post(
    "/reset-password",
    validateResetPassword,
    (req, res, next) => {
        return authController.resetPassword(req, res, next);
    }
);

authRoutes.post("/me", authMiddleware, (req, res, next) => {
    return authController.me(req, res, next);
});

export { authRoutes };
