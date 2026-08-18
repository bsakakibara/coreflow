import { Router } from "express";

import { productsController } from "./products.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { validateCreateProduct } from "../../middlewares/validate-create-product";
import { validateUpdateProduct } from "../../middlewares/validate-update-product";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { Role } from "../../generated/prisma/enums";

const router = Router();

router.use(authMiddleware);

router.get(
    "/",
    productsController.index
);

router.get(
    "/:id",
    productsController.show
);

router.post(
    "/",
    validateCreateProduct,
    productsController.create
);

router.put(
    "/:id",
    validateUpdateProduct,
    productsController.update
);

router.delete(
    "/:id",
    roleMiddleware([Role.ADMIN]),
    productsController.delete
);

export default router;