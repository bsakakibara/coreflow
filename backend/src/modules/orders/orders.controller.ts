import { Request, Response } from "express";

import { ordersService } from "./orders.service";

class OrdersController {

    async index(
        _: Request,
        response: Response
    ) {

        const orders =
            await ordersService.findAll();

        return response.json(orders);

    }

    async show(
        request: Request,
        response: Response
    ) {

        const id =
            Number(request.params.id);

        const order =
            await ordersService.findById(id);

        if (!order) {

            return response.status(404).json({
                message: "Pedido não encontrado."
            });

        }

        return response.json(order);

    }

    async create(
        request: Request,
        response: Response
    ) {

        try {

            const order =
                await ordersService.create(
                    request.body
                );

            return response
                .status(201)
                .json(order);

        } catch (error) {

            return response
                .status(400)
                .json({

                    message:
                        error instanceof Error
                            ? error.message
                            : "Erro ao criar pedido."

                });

        }

    }

    async update(
        request: Request,
        response: Response
    ) {

        try {

            const id =
                Number(request.params.id);

            const order =
                await ordersService.update(
                    id,
                    request.body
                );

            return response.json(order);

        } catch (error) {

            return response
                .status(400)
                .json({

                    message:
                        error instanceof Error
                            ? error.message
                            : "Erro ao atualizar pedido."

                });

        }

    }

    async delete(
        request: Request,
        response: Response
    ) {

        try {

            const id =
                Number(request.params.id);

            await ordersService.delete(id);

            return response
                .status(204)
                .send();

        } catch (error) {

            return response
                .status(400)
                .json({

                    message:
                        error instanceof Error
                            ? error.message
                            : "Erro ao excluir pedido."

                });

        }

    }

}

export const ordersController =
    new OrdersController();