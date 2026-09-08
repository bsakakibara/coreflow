import { useState } from "react";
import {
    Box,
    Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSnackbar } from "notistack";
import axios from "axios";

import { PageHeader } from "../../components/common/PageHeader";
import { PageActions } from "../../components/common/PageActions";
import { SearchField } from "../../components/common/SearchField";
import { useOrders } from "../../hooks/useOrders";
import { OrderTable } from "./components/OrderTable";
import { OrderModal } from "./components/OrderModal";
import type {
    CreateOrderDTO,
    Order
} from "../../types/order";
import { orderService } from "../../services/order.service";

import { ConfirmDialog } from "../../components/common/ConfirmDialog";

export function Orders() {
    const {
        orders,
        loading,
        loadOrders,
        deleteOrder
    } = useOrders();

    const { enqueueSnackbar } = useSnackbar();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | undefined>();
    const [search, setSearch] = useState("");

    const [openConfirm, setOpenConfirm] = useState(false);

    const [orderToDelete, setOrderToDelete] =
        useState<Order | null>(null);

    const filteredOrders = orders.filter(order =>
        String(order.id).includes(search) ||
        order.status.toLowerCase().includes(search.toLowerCase()) ||
        order.client.name.toLowerCase().includes(search.toLowerCase()) ||
        String(order.total).includes(search)
    );

    function handleCreate() {
        setSelectedOrder(undefined);
        setModalOpen(true);
    }

    function handleEdit(order: Order) {
        setSelectedOrder(order);
        setModalOpen(true);
    }

    function handleClose() {
        setModalOpen(false);
        setSelectedOrder(undefined);
    }


    async function handleSubmit(data: CreateOrderDTO) {
        try {
            if (selectedOrder) {
                // Envia os dados completos do formulário na edição
                await orderService.update(selectedOrder.id, {
                    clientId: data.clientId,
                    items: data.items,
                    status: selectedOrder.status 
                });

                enqueueSnackbar("Pedido atualizado com sucesso!", {
                    variant: "success"
                });
            } else {
                await orderService.create(data);
                enqueueSnackbar("Pedido criado com sucesso!", {
                    variant: "success"
                });
            }

            handleClose();
            await loadOrders();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                enqueueSnackbar(
                    error.response?.data.message ?? "Erro ao salvar pedido.",
                    { variant: "error" }
                );
            } else {
                enqueueSnackbar("Erro inesperado.", {
                    variant: "error"
                });
            }
        }
    }

    function handleDelete(order: Order) {
        setOrderToDelete(order);
        setOpenConfirm(true);
    }

    async function handleConfirmDelete() {

        if (!orderToDelete) {
            return;
        }

        await deleteOrder(orderToDelete.id);

        setOpenConfirm(false);
        setOrderToDelete(null);
    }

    function handleCloseConfirm() {

        setOpenConfirm(false);
        setOrderToDelete(null);
    }

    return (
        <>
            <PageHeader
                title="Pedidos"
                subtitle="Gerencie os pedidos cadastrados."
            >
                <PageActions>
                    <SearchField
                        value={search}
                        onChange={setSearch}
                    />

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleCreate}
                    >
                        <Box
                            component="span"
                            sx={{
                                display: { xs: "none", sm: "inline" }
                            }}
                        >
                            Novo&nbsp;
                        </Box>
                        Pedido
                    </Button>
                </PageActions>
            </PageHeader>

            <Box sx={{ mt: 3 }}>
                <OrderTable
                    orders={filteredOrders}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Box>

            <OrderModal
                open={modalOpen}
                order={selectedOrder}
                onClose={handleClose}
                onSubmit={handleSubmit}
            />

            <ConfirmDialog
                open={openConfirm}
                title="Excluir Pedido"
                message={
                    `Deseja realmente excluir o pedido #${orderToDelete?.id}?`
                }
                onClose={handleCloseConfirm}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}