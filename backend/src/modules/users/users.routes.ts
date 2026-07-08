import { Router } from "express";
import { UsersController } from "./users.controller";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get("/", (req, res) => {
  return usersController.index(req, res);
});
usersRoutes.get("/:id", (req, res) => {
  return usersController.show(req, res);
});
usersRoutes.post("/", (req, res) => {
  return usersController.create(req, res);
});
usersRoutes.put("/:id", (req, res) => {
  return usersController.update(req, res);
});
usersRoutes.delete("/:id", (req, res) => {
  return usersController.delete(req, res);
});

export { usersRoutes };