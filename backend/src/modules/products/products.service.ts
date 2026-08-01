import { prisma } from "../../database/prisma";
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

        return prisma.product.create({

            data

        });

    }

    async update(
        id: number,
        data: UpdateProductDTO
    ) {

        return prisma.product.update({

            where: {
                id
            },

            data

        });

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