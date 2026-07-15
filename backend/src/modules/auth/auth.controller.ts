import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";

export class AuthController {

    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {

            const user = await authService.login(req.body);

            res.json(user);

        } catch (error) {

            next(error);

        }
    }

    async me(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {

            const user = await authService.me(req.user.id);

            res.json(user);

        } catch (error) {

            next(error);

        }

    }
}