import { useCallback, useEffect, useState } from "react";

import { useSnackbar } from "notistack";

import axios from "axios";

import { orderService } from "../services/order.service";

import type { Order } from "../types/order";

export function useOrders() {

    const { enqueueSnackbar } = useSnackbar();

    const [orders, setOrders] = useState<Order[]>([]);

    const [loading, setLoading] = useState(true);

    const loadOrders = useCallback(async () => {

        try {

            setLoading(true);

            const data =
                await orderService.findAll();

            setOrders(data);

        } catch (error) {

            if (axios.isAxiosError(error)) {

                enqueueSnackbar(

                    error.response?.data.message ??
                    "Erro ao carregar pedidos.",

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

        } finally {

            setLoading(false);

        }

    }, [enqueueSnackbar]);

    async function deleteOrder(id: number) {

        try {

            await orderService.delete(id);

            enqueueSnackbar(

                "Pedido excluído com sucesso!",

                {
                    variant: "success"
                }

            );

            await loadOrders();

        } catch (error) {

            if (axios.isAxiosError(error)) {

                enqueueSnackbar(

                    error.response?.data.message ??
                    "Erro ao excluir pedido.",

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

        loadOrders();

    }, [loadOrders]);

    return {

        orders,

        loading,

        loadOrders,

        deleteOrder

    };

}