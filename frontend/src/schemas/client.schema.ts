import { z } from "zod";

export const clientSchema = z.object({

    name: z
        .string()
        .min(3, "Informe o nome do cliente."),

    email: z
        .string()
        .email("Email inválido.")
        .optional()
        .or(z.literal("")),

    phone: z
        .string()
        .optional(),

    document: z
        .string()
        .optional()

});

export type ClientSchema =
    z.infer<typeof clientSchema>;