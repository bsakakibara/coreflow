import { Router } from "express";
import { statusController } from "./status.controller";

const router = Router();
const controller = new statusController();

router.get("/status", (req, res) => controller.handle(req, res));

export default router;