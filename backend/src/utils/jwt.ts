import jwt from "jsonwebtoken";
import { Role } from "../generated/prisma/enums";

export function generateToken(
    userId: number,
    userEmail: string,
    userRole: Role) {
    // testando dados do generatetoken
    // console.log({
    //     userId,
    //     userEmail,
    //     userRole
    // })
    return jwt.sign(
        {
            id: userId,
            email: userEmail,
            role: userRole
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d"
        }
    );
}