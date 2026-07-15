import { Role } from "../../generated/prisma/enums";

declare namespace Express {
    export interface Request {
        user: {
            id: number;
            email: string;
            role: Role;
        };

    }
}