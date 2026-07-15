import { Router } from "express";
import { StatusController } from "./status.controller";

const router = Router();
const controller = new StatusController();

router.get("/status", (req, res) => controller.handle(req, res));

export default router;