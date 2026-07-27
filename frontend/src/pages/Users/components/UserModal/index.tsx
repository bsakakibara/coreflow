import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { UserForm } from "../UserForm";
import type { UserSchema } from "../../../../schemas/user.schema";
import { userService } from "../../../../services/user.service";
import type { User } from "../../../../types/user";
import axios from "axios";
import { useSnackbar } from "notistack";

interface UserModalProps {
    open: boolean;
    user: User | null;
    onClose: () => void;
    onSuccess: () => void;
}

export function UserModal({
    open,
    user,
    onClose,
    onSuccess
}: UserModalProps) {

    console.log("USER MODAL", user);
    const { enqueueSnackbar } = useSnackbar();

    async function handleSubmit(data: UserSchema) {

        try {

            if (user) {

                await userService.update(user.id, {
                    name: data.name,
                    email: data.email,
                    role: data.role
                });

                enqueueSnackbar(
                    "Usuário atualizado com sucesso!",
                    { variant: "success" }
                );

            } else {

                await userService.create(data);

                enqueueSnackbar(
                    "Usuário cadastrado com sucesso!",
                    { variant: "success" }
                );

            }

            onClose();

            onSuccess();

        } catch (error) {

            if (axios.isAxiosError(error)) {

                enqueueSnackbar(
                    error.response?.data.message ??
                    "Erro ao salvar usuário.",
                    {
                        variant: "error"
                    }
                );

            } else {

                enqueueSnackbar(
                    "Ocorreu um erro inesperado.",
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

                {user ? "Editar Usuário" : "Novo Usuário"}

                <IconButton
                    onClick={onClose}
                    size="small"
                >
                    <CloseIcon />
                </IconButton>

            </DialogTitle>

            <DialogContent>

                <UserForm
                    user={user}
                    onSubmit={handleSubmit}
                />

            </DialogContent>

        </Dialog>

    );

}