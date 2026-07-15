import { prisma } from "../../database/prisma";
import { AppError } from "../../errors/AppError";
import { generateToken } from "../../utils/jwt";
import { LoginDTO, LoginResponse, MeResponse } from "./auth.types";
import bcrypt from "bcrypt";

export class AuthService {
    async login(data: LoginDTO): Promise<LoginResponse> {

        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (!user) {
            throw new AppError("Email ou senha inválidos.", 401);
        }

        const passwordMatch = await bcrypt.compare(
            data.password,
            user.password
        );

        if (!passwordMatch) {
            throw new AppError("Email ou senha inválidos.", 401);
        }

        const token = generateToken(
            user.id,
            user.email,
            user.role
        );

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }

    async me(userId: number): Promise<MeResponse> {

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });

        if (!user) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        return user;
    }

}

export const authService = new AuthService();