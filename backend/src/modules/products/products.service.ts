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

    async delete(id: number) {

        return prisma.product.delete({

            where: {
                id
            }

        });

    }

}

export const productsService =
    new ProductsService();