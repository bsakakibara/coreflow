import { useEffect, useState } from "react";

import { clientService } from "../services/client.service";

import type { Client } from "../types/client";
import axios from "axios";
import { useSnackbar } from "notistack";

export function useClients() {

    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    const { enqueueSnackbar } = useSnackbar();

    async function loadClients() {

        try {

            const response = await clientService.getAll();

            setClients(response);

        } finally {

            setLoading(false);

        }

    }

    async function deleteClient(id: number) {

        try {

            await clientService.delete(id);

            enqueueSnackbar(
                "Cliente excluído com sucesso!",
                {
                    variant: "success"
                }
            );

            await loadClients();

        } catch (error) {

            if (axios.isAxiosError(error)) {

                enqueueSnackbar(
                    error.response?.data.message ??
                    "Você não possui permissão para excluir este cliente.",
                    {
                        variant: "error"
                    }
                );

            } else {

                enqueueSnackbar(
                    "Erro inesperado.",
                    {
                        variant: "error"
                    }
                );

            }

        }
    }

    useEffect(() => {

        loadClients();

    }, []);

    return {
        clients,
        loading,
        loadClients,
        deleteClient
    };

}