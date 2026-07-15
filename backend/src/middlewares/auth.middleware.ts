import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../generated/prisma/enums";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token não informado"
        });
    }

    const [, token] = authHeader.split(" ");

    try {

        const decoded = jwt.verify(token,
            process.env.JWT_SECRET as string
        ) as {
            id: number;
            email: string;
            role: Role;
        };

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        }

        next();

    } catch {

        return res.status(401).json({
            message: "token invalido"
        });
    }
}