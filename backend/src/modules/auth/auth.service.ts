import { prisma } from "../../database/prisma";
import { AppError } from "../../errors/AppError";
import { sendPasswordResetEmail } from "../../services/email.service";
import { generateToken } from "../../utils/jwt";
import {
    ForgotPasswordDTO,
    LoginDTO,
    LoginResponse,
    MeResponse,
    ResetPasswordDTO
} from "./auth.types";
import bcrypt from "bcrypt";
import crypto from "crypto";

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

    async forgotPassword(data: ForgotPasswordDTO): Promise<void> {

        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (!user) {
            return;
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        const resetTokenHash = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        const resetPasswordExpires = new Date(
            Date.now() + 30 * 60 * 1000
        );

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                resetPasswordToken: resetTokenHash,
                resetPasswordExpires
            }
        });

        // O token original será enviado por e-mail no próximo passo.
        await sendPasswordResetEmail({
            to: user.email,
            resetToken
        });
    }

    async resetPassword(data: ResetPasswordDTO): Promise<void> {

        const resetTokenHash = crypto
            .createHash("sha256")
            .update(data.token)
            .digest("hex");

        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: resetTokenHash,
                resetPasswordExpires: {
                    gt: new Date()
                }
            }
        });

        if (!user) {
            throw new AppError("Token inválido ou expirado.", 400);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null
            }
        });
    }

}

export const authService = new AuthService();