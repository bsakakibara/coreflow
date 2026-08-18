import { prisma } from "../../database/prisma";
import { AppError } from "../../errors/AppError";

import {
    CreateOrderDTO,
    UpdateOrderDTO
} from "./orders.types";

class OrdersService {

    async findAll() {

        return prisma.order.findMany({

            include: {

                client: true,

                items: {

                    include: {

                        product: true

                    }

                }

            },

            orderBy: {

                createdAt: "desc"

            }

        });

    }

    async findById(id: number) {

        return prisma.order.findUnique({

            where: {

                id

            },

            include: {

                client: true,

                items: {

                    include: {

                        product: true

                    }

                }

            }

        });

    }

    async create(data: CreateOrderDTO) {

        return prisma.$transaction(async (tx) => {

            const client = await tx.client.findUnique({

                where: {

                    id: data.clientId

                }

            });

            if (!client) {

                throw new AppError("Cliente não encontrado.", 404);

            }

            let total = 0;

            const items: {

                productId: number;

                quantity: number;

                price: number;

            }[] = [];

            for (const item of data.items) {

                const product = await tx.product.findUnique({

                    where: {

                        id: item.productId

                    }

                });

                if (!product) {

                    throw new AppError("Produto não encontrado.", 404);

                }

                if (product.stock < item.quantity) {

                    throw new Error(
                        `Estoque insuficiente para ${product.name}.`
                    );

                }

                total += Number(product.price) * item.quantity;

                items.push({

                    productId: product.id,

                    quantity: item.quantity,

                    price: Number(product.price)

                });

            }

            const order = await tx.order.create({

                data: {

                    clientId: data.clientId,

                    total,

                    items: {

                        create: items

                    }

                },

                include: {

                    client: true,

                    items: {

                        include: {

                            product: true

                        }

                    }

                }

            });

            for (const item of items) {

                await tx.product.update({

                    where: {

                        id: item.productId

                    },

                    data: {

                        stock: {

                            decrement: item.quantity

                        }

                    }

                });

            }

            return order;

        });

    }

    async update(
        id: number,
        data: UpdateOrderDTO
    ) {

        const order = await prisma.order.findUnique({

            where: {

                id

            }

        });

        if (!order) {

            throw new Error("Pedido não encontrado.");

        }

        return prisma.order.update({

            where: {

                id

            },

            data

        });

    }

    async delete(id: number) {

        return prisma.$transaction(async (tx) => {

            const order = await tx.order.findUnique({

                where: {

                    id

                },

                include: {

                    items: true

                }

            });

            if (!order) {

                throw new AppError("Pedido não encontrado.", 404);

            }

            for (const item of order.items) {

                await tx.product.update({

                    where: {

                        id: item.productId

                    },

                    data: {

                        stock: {

                            increment: item.quantity

                        }

                    }

                });

            }

            await tx.order.delete({

                where: {

                    id

                }

            });

        });

    }

}

export const ordersService =
    new OrdersService();