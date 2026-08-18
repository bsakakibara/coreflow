import { Router } from "express";

import { dashboardController } from "./dashboard.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

const dashboardRoutes = Router();

dashboardRoutes.get(
    "/dashboard",
    authMiddleware,
    dashboardController.index
);

export { dashboardRoutes };