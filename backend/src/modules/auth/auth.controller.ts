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

    async forgotPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {

            await authService.forgotPassword(req.body);

            res.json({
                message: "Se o e-mail estiver cadastrado, enviaremos instruções para recuperação de senha."
            });

        } catch (error) {

            next(error);

        }
    }

    async resetPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {

            await authService.resetPassword(req.body);

            res.json({
                message: "Senha redefinida com sucesso."
            });

        } catch (error) {

            next(error);

        }
    }
}