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
                    throw new AppError(
                        `Estoque insuficiente para ${product.name}.`,
                        400
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
                    status: "PENDENTE",
                    stockReleased: false,
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

    async update(id: number, data: UpdateOrderDTO) {

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

            /*
             * PEDIDOS FINALIZADOS
             *
             * CONCLUIDO e CANCELADO são estados finais.
             * Não permitimos alterar status depois disso.
             */

            if (
                order.status === "CONCLUIDO" &&
                data.status &&
                data.status !== "CONCLUIDO"
            ) {
                throw new AppError(
                    "Não é possível alterar o status de um pedido concluído.",
                    400
                );
            }

            if (
                order.status === "CANCELADO" &&
                data.status &&
                data.status !== "CANCELADO"
            ) {
                throw new AppError(
                    "Não é possível alterar o status de um pedido cancelado.",
                    400
                );
            }

            /*
             * CANCELAMENTO
             *
             * Somente um pedido PENDENTE pode ser cancelado.
             *
             * Ao cancelar:
             * - devolve o estoque
             * - marca stockReleased como true
             */

            if (
                order.status === "PENDENTE" &&
                data.status === "CANCELADO"
            ) {

                if (!order.stockReleased) {

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
                }

                return tx.order.update({
                    where: {
                        id
                    },
                    data: {
                        status: "CANCELADO",
                        stockReleased: true
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

            /*
             * CONCLUSÃO
             *
             * O estoque já foi reservado na criação.
             * Portanto, concluir não altera estoque.
             */

            if (
                order.status === "PENDENTE" &&
                data.status === "CONCLUIDO"
            ) {

                return tx.order.update({
                    where: {
                        id
                    },
                    data: {
                        status: "CONCLUIDO",
                        clientId: data.clientId ?? order.clientId
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

            /*
             * EDIÇÃO DOS ITENS
             *
             * Só permitimos alterar itens de pedidos PENDENTES.
             */

            if (data.items && data.items.length > 0) {

                if (order.status !== "PENDENTE") {
                    throw new AppError(
                        "Só é possível alterar os itens de um pedido pendente.",
                        400
                    );
                }

                /*
                 * Primeiro devolve o estoque dos itens atuais.
                 */

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

                let total = 0;

                const newItems: {
                    productId: number;
                    quantity: number;
                    price: number;
                }[] = [];

                /*
                 * Valida os novos itens.
                 */

                for (const item of data.items) {

                    const product = await tx.product.findUnique({
                        where: {
                            id: item.productId
                        }
                    });

                    if (!product) {
                        throw new AppError(
                            "Produto não encontrado.",
                            404
                        );
                    }

                    if (product.stock < item.quantity) {
                        throw new AppError(
                            `Estoque insuficiente para ${product.name}.`,
                            400
                        );
                    }

                    total += Number(product.price) * item.quantity;

                    newItems.push({
                        productId: product.id,
                        quantity: item.quantity,
                        price: Number(product.price)
                    });
                }

                /*
                 * Remove os itens antigos.
                 */

                await tx.orderItem.deleteMany({
                    where: {
                        orderId: id
                    }
                });

                /*
                 * Cria os novos itens.
                 */

                await tx.orderItem.createMany({
                    data: newItems.map((item) => ({
                        orderId: id,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                });

                /*
                 * Reserva o novo estoque.
                 */

                for (const item of newItems) {

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

                return tx.order.update({
                    where: {
                        id
                    },
                    data: {
                        total,
                        clientId: data.clientId ?? order.clientId
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

            /*
             * Atualização simples do cliente.
             *
             * Se não houver alteração de status nem de itens,
             * permite alterar o cliente somente enquanto PENDENTE.
             */

            if (data.clientId !== undefined) {

                if (order.status !== "PENDENTE") {
                    throw new AppError(
                        "Só é possível alterar o cliente de um pedido pendente.",
                        400
                    );
                }

                return tx.order.update({
                    where: {
                        id
                    },
                    data: {
                        clientId: data.clientId
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

            /*
             * Se não houver nenhuma alteração válida,
             * retorna o pedido atual.
             */

            return tx.order.findUnique({
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
                throw new AppError(
                    "Pedido não encontrado.",
                    404
                );
            }

            /*
             * Só devolve estoque se ele ainda estiver reservado.
             *
             * CANCELADO já devolveu o estoque.
             */

            if (!order.stockReleased) {

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