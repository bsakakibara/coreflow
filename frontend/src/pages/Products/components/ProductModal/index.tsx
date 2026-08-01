import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";

import { useSnackbar } from "notistack";

import { ProductForm } from "../ProductForm";

import type { Product } from "../../../../types/product";
import type { ProductFormData } from "../../../../schemas/product.schema";

import { productService } from "../../../../services/product.service";

interface ProductModalProps {
    open: boolean;
    product: Product | null;
    onClose: () => void;
    onSuccess: () => void | Promise<void>;
}

export function ProductModal({
    open,
    product,
    onClose,
    onSuccess
}: ProductModalProps) {

    const { enqueueSnackbar } = useSnackbar();

    async function handleSubmit(data: ProductFormData) {

        try {

            if (product) {

                await productService.update(product.id, data);

                enqueueSnackbar(
                    "Produto atualizado com sucesso!",
                    {
                        variant: "success"
                    }
                );

            } else {

                await productService.create(data);

                enqueueSnackbar(
                    "Produto cadastrado com sucesso!",
                    {
                        variant: "success"
                    }
                );

            }

            await onSuccess();

            onClose();

        } catch (error) {

            if (axios.isAxiosError(error)) {

                enqueueSnackbar(
                    error.response?.data.message ??
                    "Erro ao salvar produto.",
                    {
                        variant: "error"
                    }
                );

            } else {

                enqueueSnackbar(
                    "Erro inesperado.",
                    {
                        variant: "error"
                    }
                );

            }

        }

    }

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                {product
                    ? "Editar Produto"
                    : "Novo Produto"}

                <IconButton
                    onClick={onClose}
                    size="small"
                >
                    <CloseIcon />
                </IconButton>

            </DialogTitle>

            <DialogContent>

                <ProductForm
                    product={product}
                    loading={false}
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                />

            </DialogContent>

        </Dialog>

    );

}