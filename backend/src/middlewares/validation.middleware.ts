import { Request, Response, NextFunction } from "express";

export function validateCreateUser(
    req: Request,
    res: Response,
    next: NextFunction
): void {

    const { name, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
        res.status(400).json({
            message: "Campos obrigatórios: name, email, password"
        });
        return;
    }

    if (name.trim().length < 3) {
        res.status(400).json({
            message: "O nome deve possuir no mínimo 3 caracteres"
        });
        return
    }

    if (password.trim().length < 6) {
        res.status(400).json({
            message: "A senha deve possuir no mínimo 6 caracteres"
        });
        return
    }

    if (!emailRegex.test(email)) {
        res.status(400).json({
            message: "Email inválido"
        })

        return
    }

    next()

}