import express from "express";
import statusRouter from "./modules/status/status.routes"; 
import { usersRoutes } from "./modules/users/users.routes";

const app = express();

app.use(express.json());

app.use(statusRouter);

app.use("/users", usersRoutes);

export default app;