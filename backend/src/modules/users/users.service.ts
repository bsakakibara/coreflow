import { prisma } from "../../database/prisma";
import { AppError } from "../../errors/AppError";
import { CreateUserDTO, UpdateUserDTO, UserResponse } from "./users.types";
import bcrypt from "bcrypt";

export class UsersService {

    private toResponse(user: any): UserResponse {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }

    async getAll() {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })
    }

    async create(data: CreateUserDTO) {

        const existingUser = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (existingUser) {
            throw new AppError("Este e-mail já está cadastrado.", 409);
        }

        // biblioteca bcrypt para hash de senha
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword
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
    }

    async findById(id: number): Promise<UserResponse> {

        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        return this.toResponse(user);
    }

    async update(id: number, data: UpdateUserDTO): Promise<UserResponse | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        const updateData: UpdateUserDTO = {};

        if (data.name) {
            updateData.name = data.name;
        }

        if (data.email) {
            updateData.email = data.email;

            const existingUser = await prisma.user.findUnique({
                where: {
                    email: data.email
                }
            });

            if (existingUser && existingUser.id !== id) {
                throw new AppError("Este e-mail já está cadastrado.", 409);
            }
        }

        const updateUser = await prisma.user.update({
            where: { id },
            data: updateData
        });

        return this.toResponse(updateUser)
    }

    async delete(id: number): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        await prisma.user.delete({
            where: { id }
        });

        return true
    }

}

export const usersService = new UsersService();