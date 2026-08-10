export interface OrderItem {
    id: number;

    orderId: number;

    productId: number;

    quantity: number;

    price: number;

    product: {
        id: number;
        name: string;
        price: number;
    };
}

export interface Order {
    id: number;

    clientId: number;

    status: string;

    total: number;

    createdAt: string;

    updatedAt: string;

    client: {
        id: number;
        name: string;
    };

    items: OrderItem[];
}

export interface CreateOrderDTO {
    clientId: number;

    items: {
        productId: number;
        quantity: number;
    }[];
}

export interface UpdateOrderDTO {
    status: string;
}