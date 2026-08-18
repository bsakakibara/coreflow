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

    for (const item of items) {

        if (!item.productId) {

            res.status(400).json({
                message: "O produto é obrigatório."
            });

            return;

        }

        if (item.quantity === undefined || item.quantity === null) {

            res.status(400).json({
                message: "A quantidade é obrigatória."
            });

            return;

        }

        if (
            !Number.isInteger(item.quantity) ||
            item.quantity < 1
        ) {

            res.status(400).json({
                message: "A quantidade deve ser um número inteiro maior ou igual a 1."
            });

            return;

        }

    }

    next();
}