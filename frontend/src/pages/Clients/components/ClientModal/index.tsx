import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";

import { useSnackbar } from "notistack";

import { ClientForm } from "../ClientForm";

import type { Client } from "../../../../types/client";
import type { ClientSchema } from "../ClientForm";

import { clientService } from "../../../../services/client.service";

interface ClientModalProps {
    open: boolean;
    client: Client | null;
    onClose: () => void;
    onSuccess: () => void | Promise<void>;
}

export function ClientModal({
    open,
    client,
    onClose,
    onSuccess
}: ClientModalProps) {

    const { enqueueSnackbar } = useSnackbar();

    async function handleSubmit(data: ClientSchema) {

        try {

            if (client) {

                await clientService.update(client.id, data);

                enqueueSnackbar(
                    "Cliente atualizado com sucesso!",
                    {
                        variant: "success"
                    }
                );

            } else {

                await clientService.create(data);

                enqueueSnackbar(
                    "Cliente cadastrado com sucesso!",
                    {
                        variant: "success"
                    }
                );

            }

            await onSuccess();

            onClose();

        } catch (error) {

            if (axios.isAxiosError(error)) {

                enqueueSnackbar(
                    error.response?.data.message ??
                    "Erro ao salvar cliente.",
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

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                {client
                    ? "Editar Cliente"
                    : "Novo Cliente"}

                <IconButton
                    onClick={onClose}
                    size="small"
                >

                    <CloseIcon />

                </IconButton>

            </DialogTitle>

            <DialogContent>

                <ClientForm
                    client={client}
                    onSubmit={handleSubmit}
                />

            </DialogContent>

        </Dialog>

    );

}