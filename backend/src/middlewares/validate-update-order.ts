import { Request, Response, NextFunction } from "express";

export function validateUpdateOrder(
    req: Request,
    res: Response,
    next: NextFunction
): void {

    const { status } = req.body;

    const allowedStatuses = [
        "PENDENTE",
        "PROCESSANDO",
        "CONCLUÍDO",
        "CANCELADO"
    ];

    if (!status) {

        res.status(400).json({
            message: "O status é obrigatório."
        });

        return;

    }

    if (!allowedStatuses.includes(status)) {

        res.status(400).json({
            message: "Status inválido."
        });

        return;

    }

    next();

}