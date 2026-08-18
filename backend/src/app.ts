import express from "express";
import statusRouter from "./modules/status/status.routes";
import { usersRoutes } from "./modules/users/users.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { clientsRoutes } from "./modules/clients/clients.routes";
import productsRoutes from "./modules/products/products.routes";
import cors from "cors";
import { ordersRoutes } from "./modules/orders/orders.routes";
import { dashboardRoutes } from "./modules/dashboard/dashboard.routes";
import { reportsRoutes } from "./modules/reports/reports.routes";

const app = express();

app.use(cors());
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }));

app.use(express.json());

app.use(statusRouter);

app.use("/users", usersRoutes);

app.use(authRoutes)

app.use(dashboardRoutes);

app.use(reportsRoutes);

app.use("/clients", clientsRoutes);

app.use("/products", productsRoutes);

app.use("/orders", ordersRoutes);

app.use(errorMiddleware)

export default app;