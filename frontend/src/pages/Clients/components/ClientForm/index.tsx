import {
    Box,
    Button,
    Grid,
    TextField
} from "@mui/material";

import {
    useForm
} from "react-hook-form";

import {
    zodResolver
} from "@hookform/resolvers/zod";

import { z } from "zod";

import {
    useEffect
} from "react";

import type {
    Client
} from "../../../../types/client";
import { maskDocument, maskPhone } from "../../../../utils/format";

const clientSchema = z.object({
    name: z
        .string()
        .min(3, "Nome deve possuir no mínimo 3 caracteres."),

    email: z
        .string()
        .email("Email inválido.")
        .optional()
        .or(z.literal("")),

    phone: z.string().optional(),

    document: z.string().optional()
});

export type ClientSchema = z.infer<typeof clientSchema>;

interface ClientFormProps {
    client: Client | null;
    onSubmit: (data: ClientSchema) => void;
}

export function ClientForm({
    client,
    onSubmit
}: ClientFormProps) {

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<ClientSchema>({
        resolver: zodResolver(clientSchema)
    });

    useEffect(() => {

        if (client) {

            reset({
                name: client.name,
                email: client.email ?? "",
                phone: client.phone ?? "",
                document: client.document ?? ""
            });

        } else {

            reset({
                name: "",
                email: "",
                phone: "",
                document: ""
            });

        }

    }, [client, reset]);

    return (

        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                mt: 2
            }}
        >

            <Grid
                container
                spacing={2}
            >

                <Grid size={12}>

                    <TextField
                        fullWidth
                        label="Nome"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />

                </Grid>

                <Grid size={6}>

                    <TextField
                        fullWidth
                        label="Email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                </Grid>

                <Grid size={6}>

                    <TextField
                        fullWidth
                        label="Telefone"
                        {...register("phone")}
                        onChange={(e) =>
                            setValue(
                                "phone",
                                maskPhone(e.target.value)
                            )
                        }
                    />

                </Grid>

                <Grid size={12}>

                    <TextField
                        fullWidth
                        label="CPF/CNPJ"
                        {...register("document")}
                        onChange={(e) =>
                            setValue(
                                "document",
                                maskDocument(e.target.value)
                            )
                        }
                    />

                </Grid>

            </Grid>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 3
                }}
            >

                <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                >
                    Salvar
                </Button>

            </Box>

        </Box>

    );

}