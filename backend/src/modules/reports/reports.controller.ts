import {
    Request,
    Response,
    NextFunction
} from "express";

import { reportsService } from "./reports.service";

export class ReportsController {

    async index(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {

            const reports =
                await reportsService.getReports();

            res.json(reports);

        } catch (error) {

            next(error);

        }

    }

}

export const reportsController =
    new ReportsController();