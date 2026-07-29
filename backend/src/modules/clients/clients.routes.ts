import { Router } from "express";

import { ClientsController } from "./clients.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

import { Role } from "../../generated/prisma/enums";

import { validateCreateClient } from "../../middlewares/validate-create-client";
import { validateUpdateClient } from "../../middlewares/validate-update-client";

const clientsRoutes = Router();

const clientsController = new ClientsController();

clientsRoutes.get(
    "/",
    authMiddleware,
    (req, res, next) => {
        return clientsController.index(req, res, next);
    }
);

clientsRoutes.get(
    "/:id",
    authMiddleware,
    (req, res, next) => {
        return clientsController.show(req, res, next);
    }
);

clientsRoutes.post(
    "/",
    authMiddleware,
    validateCreateClient,
    (req, res, next) => {
        return clientsController.create(req, res, next);
    }
);

clientsRoutes.put(
    "/:id",
    authMiddleware,
    validateUpdateClient,
    (req, res, next) => {
        return clientsController.update(req, res, next);
    }
);

clientsRoutes.delete(
    "/:id",
    authMiddleware,
    roleMiddleware([Role.ADMIN]),
    (req, res, next) => {
        return clientsController.delete(req, res, next);
    }
);

export { clientsRoutes };