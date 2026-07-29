import { Request, Response, NextFunction } from "express";

export function validateCreateClient(
    req: Request,
    res: Response,
    next: NextFunction
): void {

    const { name, email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name?.trim()) {

        res.status(400).json({
            message: "O nome é obrigatório."
        });

        return;

    }

    if (name.trim().length < 3) {

        res.status(400).json({
            message: "O nome deve possuir no mínimo 3 caracteres."
        });

        return;

    }

    if (email && !emailRegex.test(email)) {

        res.status(400).json({
            message: "Email inválido."
        });

        return;

    }

    next();

}