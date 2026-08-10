import { prisma } from "../../database/prisma";

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

                throw new Error("Cliente não encontrado.");

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

                    throw new Error("Produto não encontrado.");

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

        return prisma.order.update({

            where: {

                id

            },

            data

        });

    }

    async delete(id: number) {

        return prisma.order.delete({

            where: {

                id

            }

        });

    }

}

export const ordersService =
    new OrdersService();