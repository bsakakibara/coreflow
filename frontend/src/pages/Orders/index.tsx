import {
    Box,
    Button,
    Typography
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useState } from "react";

import { useSnackbar } from "notistack";

import axios from "axios";

import { useOrders } from "../../hooks/useOrders";

import { OrderTable } from "./components/OrderTable";
import { OrderModal } from "./components/OrderModal";

import type {
    CreateOrderDTO,
    Order
} from "../../types/order";

import { orderService } from "../../services/order.service";

export function Orders() {

    const {
        orders,
        loading,
        loadOrders,
        deleteOrder
    } = useOrders();

    const { enqueueSnackbar } = useSnackbar();

    const [modalOpen, setModalOpen] =
        useState(false);

    const [selectedOrder, setSelectedOrder] =
        useState<Order | undefined>();

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

    async function handleSubmit(
        data: CreateOrderDTO
    ) {

        try {

            if (selectedOrder) {

                await orderService.update(
                    selectedOrder.id,
                    {
                        status: "CONCLUÍDO"
                    }
                );

                enqueueSnackbar(
                    "Pedido atualizado com sucesso!",
                    {
                        variant: "success"
                    }
                );

            } else {

                await orderService.create(data);

                enqueueSnackbar(
                    "Pedido criado com sucesso!",
                    {
                        variant: "success"
                    }
                );

            }

            handleClose();

            await loadOrders();

        } catch (error) {

            if (axios.isAxiosError(error)) {

                enqueueSnackbar(
                    error.response?.data.message ??
                    "Erro ao salvar pedido.",
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

    function handleDelete(order: Order) {

        if (
            !window.confirm(
                `Deseja excluir o pedido #${order.id}?`
            )
        ) {

            return;

        }

        deleteOrder(order.id);

    }

    return (

        <Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >

                <Typography variant="h4">
                    Pedidos
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreate}
                >
                    Novo pedido
                </Button>

            </Box>

            <OrderTable
                orders={orders}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <OrderModal
                open={modalOpen}
                order={selectedOrder}
                onClose={handleClose}
                onSubmit={handleSubmit}
            />

        </Box>

    );

}