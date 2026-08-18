import { Request, Response, NextFunction } from "express";
import { dashboardService } from "./dashboard.service";

export class DashboardController {

    async index(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {

            const dashboard =
                await dashboardService.getDashboard();

            res.json(dashboard);

        } catch (error) {

            next(error);

        }
    }
}

export const dashboardController =
    new DashboardController();