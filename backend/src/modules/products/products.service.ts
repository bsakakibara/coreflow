import { prisma } from "../../database/prisma";
import { AppError } from "../../errors/AppError";

import {
    CreateProductDTO,
    UpdateProductDTO
} from "./products.types";

class ProductsService {

    async findAll() {

        return prisma.product.findMany({

            orderBy: {
                name: "asc"
            }

        });

    }

    async findById(id: number) {

        return prisma.product.findUnique({

            where: {
                id
            }

        });

    }

    async create(data: CreateProductDTO) {

        try {

            return await prisma.product.create({

                data

            });

        } catch (error: any) {

            if (error?.code === "P2002") {

                throw new AppError(
                    "Este SKU já está cadastrado.",
                    409
                );

            }

            throw error;

        }

    }

    async update(
        id: number,
        data: UpdateProductDTO
    ) {

        try {

            return await prisma.product.update({

                where: {
                    id
                },

                data

            });

        } catch (error: any) {

            if (error?.code === "P2002") {

                throw new AppError(
                    "Este SKU já está cadastrado.",
                    409
                );

            }

            throw error;

        }

    }

    async delete(id: number): Promise<boolean> {

        const product = await prisma.product.findUnique({
            where: { id }
        });

        if (!product) {
            throw new AppError("Produto não encontrado.", 404);
        }

        // Se o produto estiver vinculado a algum pedido, impede a exclusão
        const orderItemsCount = await prisma.orderItem.count({
            where: {
                productId: id
            }
        });

        if (orderItemsCount > 0) {
            throw new AppError(
                "Não é possível excluir este produto porque existem pedidos vinculados a ele.",
                409
            );
        }

        await prisma.product.delete({
            where: { id }
        });

        return true;
    }

}

export const productsService =
    new ProductsService();