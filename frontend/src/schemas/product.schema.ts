import { z } from "zod";

export const productSchema = z.object({

    name: z
        .string()
        .min(3, "Informe o nome."),

    description: z
        .string()
        .optional(),

    sku: z
        .string()
        .optional(),

    price: z
        .number()
        .positive("O preço deve ser maior que zero."),

    stock: z
        .number()
        .min(0, "O estoque não pode ser negativo.")

});

export type ProductFormData =
    z.infer<typeof productSchema>;