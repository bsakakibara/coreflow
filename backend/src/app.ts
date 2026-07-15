import express from "express";
import statusRouter from "./modules/status/status.routes"; 
import { usersRoutes } from "./modules/users/users.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use(statusRouter);

app.use("/users", usersRoutes);

app.use(authRoutes)

app.use(errorMiddleware)

export default app;