import { Request, Response } from "express";

import { productsService } from "./products.service";

class ProductsController {

    async index(
        _: Request,
        response: Response
    ) {

        const products =
            await productsService.findAll();

        return response.json(products);

    }

    async show(
        request: Request,
        response: Response
    ) {

        const id =
            Number(request.params.id);

        const product =
            await productsService.findById(id);

        if (!product) {

            return response.status(404).json({
                message: "Produto não encontrado."
            });

        }

        return response.json(product);

    }

    async create(
        request: Request,
        response: Response
    ) {

        const product =
            await productsService.create(
                request.body
            );

        return response
            .status(201)
            .json(product);

    }

    async update(
        request: Request,
        response: Response
    ) {

        const id =
            Number(request.params.id);

        const product =
            await productsService.update(
                id,
                request.body
            );

        return response.json(product);

    }

    async delete(
        request: Request,
        response: Response
    ) {

        const id =
            Number(request.params.id);

        await productsService.delete(id);

        return response
            .status(204)
            .send();

    }

}

export const productsController =
    new ProductsController();