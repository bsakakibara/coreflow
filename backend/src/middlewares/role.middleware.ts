import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prisma";
import { Role } from "../generated/prisma/enums";

export function roleMiddleware(roles: Role[]) {

    return async (
        req: Request,
        res: Response,
        next: NextFunction

    ): Promise<void> => {

        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                message: "Acesso negado"
            });

            return;
        }

        next();

    };

}