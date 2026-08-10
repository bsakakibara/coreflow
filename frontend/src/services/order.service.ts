import { api } from "./api";

import type {

    Order,

    CreateOrderDTO,

    UpdateOrderDTO

} from "../types/order";

export const orderService = {

    async findAll() {

        const { data } =
            await api.get<Order[]>("/orders");

        return data;

    },

    async create(data: CreateOrderDTO) {

        const response =
            await api.post<Order>(
                "/orders",
                data
            );

        return response.data;

    },

    async update(
        id: number,
        data: UpdateOrderDTO
    ) {

        const response =
            await api.put<Order>(
                `/orders/${id}`,
                data
            );

        return response.data;

    },

    async delete(id: number) {

        await api.delete(`/orders/${id}`);

    }

};