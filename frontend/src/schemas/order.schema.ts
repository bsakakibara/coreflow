import { z } from "zod";

export const orderSchema = z.object({

    clientId: z
        .number()
        .positive("Cliente obrigatório."),

    items: z
        .array(

            z.object({

                productId: z
                    .number()
                    .positive(),

                quantity: z
                    .number()
                    .positive()

            })

        )
        .min(1, "Adicione pelo menos um produto.")

});

export type OrderFormData =
    z.infer<typeof orderSchema>;