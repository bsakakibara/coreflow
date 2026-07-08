import { Request, Response } from "express";
import { usersService } from "./users.service";

export class UsersController {
    async index(req: Request, res: Response): Promise<Response> {

        const users = await usersService.getAll();

        return res.json(users);
    }

    async create(req: Request, res: Response): Promise<Response> {
        console.log(req.body);
        const user = await usersService.create(req.body);

        return res.status(201).json(user);
    }

    async show(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);

        const user = await usersService.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado"
            });
        }

        return res.json(user);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);

        const user = await usersService.update(id, req.body);

        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado"
            });
        }

        return res.json(user);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);

        const user = await usersService.delete(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado"
            });
        }

        return res.status(204).send();

    }

}