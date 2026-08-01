import { useEffect, useState } from "react";

import { productService } from "../services/product.service";

import type { Product } from "../types/product";

import axios from "axios";

import { useSnackbar } from "notistack";

export function useProducts() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const { enqueueSnackbar } = useSnackbar();

    async function loadProducts() {

        try {

            const response =
                await productService.findAll();

            setProducts(response);

        } finally {

            setLoading(false);

        }

    }

    async function deleteProduct(id: number) {

        try {

            await productService.delete(id);

            enqueueSnackbar(
                "Produto excluído com sucesso!",
                {
                    variant: "success"
                }
            );

            await loadProducts();

        } catch (error) {

            if (axios.isAxiosError(error)) {

                enqueueSnackbar(

                    error.response?.data.message ??
                    "Erro ao excluir produto.",

                    {
                        variant: "error"
                    }

                );

            }

        }

    }

    useEffect(() => {

        loadProducts();

    }, []);

    return {

        products,
        loading,
        loadProducts,
        deleteProduct

    };

}