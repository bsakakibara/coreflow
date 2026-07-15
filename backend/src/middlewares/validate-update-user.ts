import { Request, Response, NextFunction } from "express";

export function validateUpdateUser(
    req: Request,
    res: Response,
    next: NextFunction
): void {

    const { name, email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name !== undefined) {

        if (!name.trim()) {
            res.status(400).json({
                message: "Nome inválido."
            });

            return;
        }

        if (name.trim().length < 3) {
            res.status(400).json({
                message: "O nome deve possuir no mínimo 3 caracteres."
            });

            return;
        }

    }

    if (email !== undefined) {

        if (!email.trim()) {
            res.status(400).json({
                message: "Email inválido."
            });

            return;
        }

        if (!emailRegex.test(email)) {
            res.status(400).json({
                message: "Email inválido."
            });

            return;
        }

    }

    next();

}