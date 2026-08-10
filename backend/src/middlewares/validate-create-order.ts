import { Request, Response, NextFunction } from "express";

export function validateCreateOrder(
    req: Request,
    res: Response,
    next: NextFunction
): void {

    const {
        clientId,
        items
    } = req.body;

    if (!clientId) {

        res.status(400).json({
            message: "O cliente é obrigatório."
        });

        return;

    }

    if (!Array.isArray(items) || items.length === 0) {

        res.status(400).json({
            message: "O pedido deve possuir ao menos um item."
        });

        return;

    }

    next();

}