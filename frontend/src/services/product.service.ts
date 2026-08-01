import { api } from "./api";

import type {
    Product,
    CreateProductDTO,
    UpdateProductDTO
} from "../types/product";

export const productService = {

    async findAll() {

        const { data } =
            await api.get<Product[]>("/products");

        return data;

    },

    async create(data: CreateProductDTO) {

        const response =
            await api.post<Product>(
                "/products",
                data
            );

        return response.data;

    },

    async update(
        id: number,
        data: UpdateProductDTO
    ) {

        const response =
            await api.put<Product>(
                `/products/${id}`,
                data
            );

        return response.data;

    },

    async delete(id: number) {

        await api.delete(`/products/${id}`);

    }

};