import { useEffect } from "react";

import {
    Box,
    Button,
    Grid,
    TextField
} from "@mui/material";

import {
    Controller,
    useForm
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { productSchema } from "../../../../schemas/product.schema";

import type { ProductFormData } from "../../../../schemas/product.schema";

import type { Product } from "../../../../types/product";

interface ProductFormProps {

    product?: Product | null;

    loading: boolean;

    onSubmit: (data: ProductFormData) => Promise<void>;

    onCancel: () => void;

}

export function ProductForm({

    product,

    loading,

    onSubmit,

    onCancel

}: ProductFormProps) {

    const {

        control,

        handleSubmit,

        reset,

        formState: {

            errors

        }

    } = useForm<ProductFormData>({

        resolver: zodResolver(productSchema),

        defaultValues: {

            name: "",

            description: "",

            sku: "",

            price: 0,

            stock: 0

        }

    });

    useEffect(() => {

        if (product) {

            reset({

                name: product.name,

                description: product.description ?? "",

                sku: product.sku ?? "",

                price: Number(product.price),

                stock: product.stock

            });

        } else {

            reset({

                name: "",

                description: "",

                sku: "",

                price: 0,

                stock: 0

            });

        }

    }, [product, reset]);

    return (

        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >

            <Grid
                container
                spacing={2}
            >

                <Grid size={12}>

                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (

                            <TextField

                                {...field}

                                fullWidth

                                label="Nome"

                                error={!!errors.name}

                                helperText={errors.name?.message}

                            />

                        )}
                    />

                </Grid>

                <Grid size={12}>

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (

                            <TextField

                                {...field}

                                fullWidth

                                multiline

                                rows={3}

                                label="Descrição"

                            />

                        )}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <Controller
                        name="sku"
                        control={control}
                        render={({ field }) => (

                            <TextField

                                {...field}

                                fullWidth

                                label="SKU"

                            />

                        )}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (

                            <TextField

                                {...field}

                                fullWidth

                                type="number"

                                label="Preço"

                                error={!!errors.price}

                                helperText={errors.price?.message}

                                onChange={(e) =>

                                    field.onChange(

                                        Number(e.target.value)

                                    )

                                }

                            />

                        )}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <Controller
                        name="stock"
                        control={control}
                        render={({ field }) => (

                            <TextField

                                {...field}

                                fullWidth

                                type="number"

                                label="Estoque"

                                error={!!errors.stock}

                                helperText={errors.stock?.message}

                                onChange={(e) =>

                                    field.onChange(

                                        Number(e.target.value)

                                    )

                                }

                            />

                        )}
                    />

                </Grid>

            </Grid>

            <Box
                sx={{
                    mt: 3,
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2
                }}
            >

                <Button
                    onClick={onCancel}
                >

                    Cancelar

                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                >

                    Salvar

                </Button>

            </Box>

        </Box>

    );

}