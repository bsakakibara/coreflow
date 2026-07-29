import type { Client, CreateClientDTO, UpdateClientDTO } from "../types/client";
import { api } from "./api";



class ClientService {

    async getAll(): Promise<Client[]> {

        const { data } = await api.get("/clients");

        return data;

    }

    async getById(id: number): Promise<Client> {

        const { data } = await api.get(`/clients/${id}`);

        return data;

    }

    async create(
        client: CreateClientDTO
    ): Promise<Client> {

        const { data } = await api.post(
            "/clients",
            client
        );

        return data;

    }

    async update(
        id: number,
        client: UpdateClientDTO
    ): Promise<Client> {

        const { data } = await api.put(
            `/clients/${id}`,
            client
        );

        return data;

    }

    async delete(id: number): Promise<void> {

        await api.delete(`/clients/${id}`);

    }

}

export const clientService = new ClientService();