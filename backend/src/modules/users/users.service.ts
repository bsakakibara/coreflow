import { prisma } from "../../database/prisma";
import { CreateUserDTO, UpdateUserDTO, UserResponse } from "./users.types";

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
        return await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password
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

    async findById(id: number): Promise<UserResponse | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            return null;
        }

        return this.toResponse(user);
    }

    async update(id: number, data: UpdateUserDTO): Promise<UserResponse | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            return null;
        }

        const updateUser = await prisma.user.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email
            }
        });

        return this.toResponse(updateUser)
    }

    async delete(id: number): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            return false;
        }

        await prisma.user.delete({
            where: { id }
        });

        return true
    }

}

export const usersService = new UsersService();