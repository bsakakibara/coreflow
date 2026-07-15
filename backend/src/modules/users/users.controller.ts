import { NextFunction, Request, Response } from "express";
import { usersService } from "./users.service";

export class UsersController {
    async index(req: Request, res: Response): Promise<Response> {

        const users = await usersService.getAll();

        return res.json(users);
    }

    async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {

            const user = await usersService.create(req.body);

            res.status(201).json(user);

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

            const user = await usersService.findById(id);

            res.json(user);

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

            const user = await usersService.update(id, req.body);

            res.json(user);

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

            await usersService.delete(id);

            res.status(204).send();

        } catch (error) {

            next(error);

        }

    }

}