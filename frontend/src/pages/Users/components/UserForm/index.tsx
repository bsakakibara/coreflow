import {
    Button,
    MenuItem,
    Stack,
    TextField
} from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    userSchema,
    type UserSchema
} from "../../../../schemas/user.schema";
import type { User } from "../../../../types/user";
import { useEffect } from "react";

interface UserFormProps {
    user: User | null;
    onSubmit: (data: UserSchema) => void;
}

export function UserForm({
    user,
    onSubmit
}: UserFormProps) {

    console.log("USER FORM", user);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<UserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "EMPLOYEE"
        }
    });

    useEffect(() => {

        if (user) {

            reset({
                name: user.name,
                email: user.email,
                password: "",
                role: user.role as "ADMIN" | "EMPLOYEE"
            });

        } else {

            reset({
                name: "",
                email: "",
                password: "",
                role: "EMPLOYEE"
            });

        }

    }, [user, reset]);

    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            <Stack spacing={3} sx={{ mt: 1 }}>

                <TextField
                    label="Nome"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...register("name")}
                />

                <TextField
                    label="E-mail"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register("email")}
                />

                <TextField
                    label="Senha"
                    type="password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register("password")}
                />

                <TextField
                    select
                    label="Perfil"
                    defaultValue=""
                    error={!!errors.role}
                    helperText={errors.role?.message}
                    {...register("role")}
                >
                    <MenuItem value="ADMIN">
                        Administrador
                    </MenuItem>

                    <MenuItem value="EMPLOYEE">
                        Colaborador
                    </MenuItem>

                </TextField>

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    loading={isSubmitting}
                >
                    Salvar
                </Button>

            </Stack>

        </form>

    );

}