export type OrderStatus =
    | "PENDENTE"
    | "CONCLUIDO"
    | "CANCELADO";


export interface OrderItemDTO {
    productId: number;
    quantity: number;
}

export interface CreateOrderDTO {
    clientId: number;
    items: OrderItemDTO[];
}

export interface UpdateOrderDTO {
    clientId?: number;
    status?: OrderStatus;
    items?: {
        productId: number;
        quantity: number;
    }[];
}