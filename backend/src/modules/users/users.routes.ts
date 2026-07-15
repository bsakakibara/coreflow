import { Router } from "express";
import { UsersController } from "./users.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { Role } from "../../generated/prisma/enums";
import { validateUpdateUser } from "../../middlewares/validate-update-user";
import { validateCreateUser } from "../../middlewares/validation.middleware";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get("/", authMiddleware, (req, res) => {
  return usersController.index(req, res);
});
usersRoutes.get("/:id", authMiddleware, (req, res, next) => {
  return usersController.show(req, res, next);
});
usersRoutes.post(
  "/",
  validateCreateUser,
  (req, res, next) => {
    return usersController.create(req, res, next);
  }
);
usersRoutes.put(
  "/:id",
  authMiddleware,
  validateUpdateUser,
  (req, res, next) => {
    return usersController.update(req, res, next);
  }
);
usersRoutes.delete(
  "/:id",
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  (req, res, next) => {
    return usersController.delete(req, res, next);
  });

export { usersRoutes };