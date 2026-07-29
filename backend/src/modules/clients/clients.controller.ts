import { NextFunction, Request, Response } from "express";

import { clientsService } from "./clients.service";

export class ClientsController {

    async index(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {

            const clients = await clientsService.getAll();

            res.json(clients);

        } catch (error) {

            next(error);

        }

    }

    async show(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {

            const id = Number(req.params.id);

            const client = await clientsService.findById(id);

            res.json(client);

        } catch (error) {

            next(error);

        }

    }

    async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {

            const client = await clientsService.create(req.body);

            res.status(201).json(client);

        } catch (error) {

            next(error);

        }

    }

    async update(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const id = Number(req.params.id);
            const client = await clientsService.update(id, req.body);
            res.json(client);
        } catch (error) {
            next(error);
        }
    }

    async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const id = Number(req.params.id);
            await clientsService.delete(id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

}