import { Request, Response, NextFunction } from "express";

export function validateUpdateOrder(
    req: Request,
    res: Response,
    next: NextFunction
): void {

    const { status, items, clientId } = req.body;

    const allowedStatuses = [
        "PENDENTE",
        "CONCLUIDO",
        "CANCELADO"
    ];

    // Status é opcional, mas quando informado deve ser válido
    if (
        status !== undefined &&
        !allowedStatuses.includes(status)
    ) {
        res.status(400).json({
            message: "Status inválido."
        });
        return;
    }

    // Cliente é opcional, mas quando informado deve ser um inteiro positivo
    if (clientId !== undefined) {

        if (
            !Number.isInteger(clientId) ||
            clientId < 1
        ) {
            res.status(400).json({
                message: "O cliente deve ser um número inteiro maior ou igual a 1."
            });
            return;
        }
    }

    // Itens são opcionais, mas quando informados devem ser válidos
    if (items !== undefined) {

        if (!Array.isArray(items) || items.length === 0) {
            res.status(400).json({
                message: "O pedido deve possuir ao menos um item."
            });
            return;
        }

        for (const item of items) {

            if (
                !item ||
                !Number.isInteger(item.productId) ||
                item.productId < 1
            ) {
                res.status(400).json({
                    message: "O produto deve ser um número inteiro maior ou igual a 1."
                });
                return;
            }

            if (
                item.quantity === undefined ||
                item.quantity === null ||
                !Number.isInteger(item.quantity) ||
                item.quantity < 1
            ) {
                res.status(400).json({
                    message: "A quantidade deve ser um número inteiro maior ou igual a 1."
                });
                return;
            }
        }
    }

    next();
}