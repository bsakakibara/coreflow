import { Router } from "express";

import { ordersController } from "./orders.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

import { Role } from "../../generated/prisma/enums";

import { validateCreateOrder } from "../../middlewares/validate-create-order";
import { validateUpdateOrder } from "../../middlewares/validate-update-order";

const ordersRoutes = Router();

ordersRoutes.use(authMiddleware);

ordersRoutes.get(
    "/",
    ordersController.index
);

ordersRoutes.get(
    "/:id",
    ordersController.show
);

ordersRoutes.post(
    "/",
    validateCreateOrder,
    ordersController.create
);

ordersRoutes.put(
    "/:id",
    validateUpdateOrder,
    ordersController.update
);

ordersRoutes.delete(
    "/:id",
    roleMiddleware([Role.ADMIN]),
    ordersController.delete
);

export { ordersRoutes };