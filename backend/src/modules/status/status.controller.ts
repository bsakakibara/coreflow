import { Request, Response } from "express";
import { StatusService } from "./status.service";

const  service = new StatusService;

export class statusController {
    handle(req: Request, res: Response) {
        const data = service.getStatus();
        return res.json(data);
    }
}