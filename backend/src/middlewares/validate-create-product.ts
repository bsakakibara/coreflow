import { Request, Response, NextFunction } from "express";

export function validateCreateProduct(
    req: Request,
    res: Response,
    next: NextFunction
): void {

    const {
        name,
        price,
        stock
    } = req.body;

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

    if (price === undefined || Number(price) <= 0) {

        res.status(400).json({
            message: "Preço inválido."
        });

        return;

    }

    if (stock === undefined || Number(stock) < 0) {

        res.status(400).json({
            message: "Estoque inválido."
        });

        return;

    }

    next();

}