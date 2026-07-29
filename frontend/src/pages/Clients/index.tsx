import { useState } from "react";

import {
    Box,
    Button,
    TextField
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { PageHeader } from "../../components/common/PageHeader";

import { useClients } from "../../hooks/useClients";

import { ClientTable } from "./components/ClientTable";
import { ClientModal } from "./components/ClientModal";

import type { Client } from "../../types/client";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";

export function Clients() {

    const {
        clients,
        loading,
        loadClients,
        deleteClient
    } = useClients();

    const [openModal, setOpenModal] =
        useState(false);

    const [selectedClient,
        setSelectedClient] =
        useState<Client | null>(null);

    const [search, setSearch] = useState("");

    const filteredClients = clients.filter(client =>
        client.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        (client.email ?? "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        (client.phone ?? "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        (client.document ?? "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    function handleCreate() {

        setSelectedClient(null);

        setOpenModal(true);

    }

    function handleEdit(client: Client) {

        setSelectedClient(client);

        setOpenModal(true);

    }

    function handleCloseModal() {

        setOpenModal(false);

    }

    const [openConfirm, setOpenConfirm] =
        useState(false);

    const [clientToDelete, setClientToDelete] =
        useState<Client | null>(null);

    function handleDelete(client: Client) {

        setClientToDelete(client);

        setOpenConfirm(true);

    }

    async function handleConfirmDelete() {

        if (!clientToDelete) return;

        await deleteClient(clientToDelete.id);

        setOpenConfirm(false);

        setClientToDelete(null);

    }

    function handleCloseConfirm() {

        setOpenConfirm(false);

        setClientToDelete(null);

    }

    return (

        <>

            <PageHeader
                title="Clientes"
                subtitle="Gerencie os clientes cadastrados."
            >

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center"
                    }}
                >

                    <TextField
                        size="small"
                        placeholder="Pesquisar..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleCreate}
                    >
                        Novo Cliente
                    </Button>

                </Box>

            </PageHeader>

            <Box
                sx={{
                    mt: 3
                }}
            >

                <ClientTable
                    clients={filteredClients}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

            </Box>

            <ClientModal
                open={openModal}
                client={selectedClient}
                onClose={handleCloseModal}
                onSuccess={loadClients}
            />

            <ConfirmDialog
                open={openConfirm}
                title="Excluir Cliente"
                message={
                    `Deseja realmente excluir o cliente "${clientToDelete?.name}"?`
                }
                onClose={handleCloseConfirm}
                onConfirm={handleConfirmDelete}
            />

        </>

    );

}