import { Request, Response, NextFunction } from "express";

export function validateUpdateOrder(
    req: Request,
    res: Response,
    next: NextFunction
): void {

    const {
        clientId,
        items
    } = req.body;

    if (clientId !== undefined && Number(clientId) <= 0) {

        res.status(400).json({
            message: "Cliente inválido."
        });

        return;

    }

    if (items !== undefined) {

        if (!Array.isArray(items) || items.length === 0) {

            res.status(400).json({
                message: "O pedido deve possuir ao menos um item."
            });

            return;

        }

    }

    next();

}