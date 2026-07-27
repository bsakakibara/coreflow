import { z } from "zod";

export const userSchema = z.object({
    name: z
        .string()
        .min(3, "Informe o nome"),

    email: z
        .email("Informe um e-mail válido"),

    password: z
        .string()
        .min(6, "A senha deve possuir no mínimo 6 caracteres"),

    role: z.enum(
        ["ADMIN", "EMPLOYEE"],
        {
            message: "Selecione um perfil"
        }
    )
});

export type UserSchema = z.infer<typeof userSchema>;