import { Router } from "express";

import { reportsController } from "./reports.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

const reportsRoutes = Router();

reportsRoutes.get(
    "/reports",
    authMiddleware,
    reportsController.index
);

export { reportsRoutes };