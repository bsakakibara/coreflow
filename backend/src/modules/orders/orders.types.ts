export interface OrderItemDTO {
    productId: number;
    quantity: number;
}

export interface CreateOrderDTO {
    clientId: number;
    items: OrderItemDTO[];
}

export interface UpdateOrderDTO {
    status?: string;
}