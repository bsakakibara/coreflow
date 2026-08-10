import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import type {
    CreateOrderDTO,
    Order
} from "../../../../types/order";

import { OrderForm } from "../OrderForm";

interface OrderModalProps {

    open: boolean;

    order?: Order;

    onClose: () => void;

    onSubmit: (data: CreateOrderDTO) => void;

}

export function OrderModal({

    open,

    order,

    onClose,

    onSubmit

}: OrderModalProps) {

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                {order
                    ? "Editar pedido"
                    : "Novo pedido"}

                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8
                    }}
                >

                    <CloseIcon />

                </IconButton>

            </DialogTitle>

            <DialogContent>

                <OrderForm
                    order={order}
                    onSubmit={onSubmit}
                    onCancel={onClose}
                />

            </DialogContent>

        </Dialog>

    );

}