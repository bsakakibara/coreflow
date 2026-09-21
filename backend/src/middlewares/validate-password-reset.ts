import { Request, Response, NextFunction } from "express";

export function validateForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
): void {

    const { email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email?.trim()) {
        res.status(400).json({
            message: "E-mail é obrigatório."
        });
        return;
    }

    if (!emailRegex.test(email.trim())) {
        res.status(400).json({
            message: "E-mail inválido."
        });
        return;
    }

    next();
}

export function validateResetPassword(
    req: Request,
    res: Response,
    next: NextFunction
): void {

    const { token, password } = req.body;

    if (!token?.trim() || !password?.trim()) {
        res.status(400).json({
            message: "Token e senha são obrigatórios."
        });
        return;
    }

    if (password.trim().length < 6) {
        res.status(400).json({
            message: "A senha deve possuir no mínimo 6 caracteres."
        });
        return;
    }

    next();
}