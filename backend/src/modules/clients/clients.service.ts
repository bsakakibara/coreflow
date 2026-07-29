import { prisma } from "../../database/prisma";
import { AppError } from "../../errors/AppError";

import {
    ClientResponse,
    CreateClientDTO,
    UpdateClientDTO
} from "./clients.types";

export class ClientsService {

    private toResponse(client: any): ClientResponse {

        return {
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone,
            document: client.document,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        };

    }

    async getAll(): Promise<ClientResponse[]> {

        return await prisma.client.findMany({
            orderBy: {
                name: "asc"
            }
        });

    }

    async findById(id: number): Promise<ClientResponse> {

        const client = await prisma.client.findUnique({
            where: { id }
        });

        if (!client) {
            throw new AppError("Cliente não encontrado.", 404);
        }

        return this.toResponse(client);

    }

    async create(data: CreateClientDTO): Promise<ClientResponse> {

        if (data.email) {

            const existingEmail = await prisma.client.findUnique({
                where: {
                    email: data.email
                }
            });

            if (existingEmail) {
                throw new AppError(
                    "Este e-mail já está cadastrado.",
                    409
                );
            }

        }

        if (data.document) {

            const existingDocument = await prisma.client.findUnique({
                where: {
                    document: data.document
                }
            });

            if (existingDocument) {
                throw new AppError(
                    "Este documento já está cadastrado.",
                    409
                );
            }

        }

        const client = await prisma.client.create({
            data
        });

        return this.toResponse(client);

    }

    async update(
        id: number,
        data: UpdateClientDTO
    ): Promise<ClientResponse> {

        const client = await prisma.client.findUnique({
            where: { id }
        });

        if (!client) {
            throw new AppError("Cliente não encontrado.", 404);
        }

        if (data.email) {

            const existingEmail = await prisma.client.findUnique({
                where: {
                    email: data.email
                }
            });

            if (
                existingEmail &&
                existingEmail.id !== id
            ) {
                throw new AppError(
                    "Este e-mail já está cadastrado.",
                    409
                );
            }

        }

        if (data.document) {

            const existingDocument = await prisma.client.findUnique({
                where: {
                    document: data.document
                }
            });

            if (
                existingDocument &&
                existingDocument.id !== id
            ) {
                throw new AppError(
                    "Este documento já está cadastrado.",
                    409
                );
            }

        }

        const updatedClient =
            await prisma.client.update({
                where: { id },
                data
            });

        return this.toResponse(updatedClient);

    }

    async delete(id: number): Promise<boolean> {

        const client = await prisma.client.findUnique({
            where: { id }
        });

        if (!client) {
            throw new AppError("Cliente não encontrado.", 404);
        }

        await prisma.client.delete({
            where: { id }
        });

        return true;

    }

}

export const clientsService =
    new ClientsService();