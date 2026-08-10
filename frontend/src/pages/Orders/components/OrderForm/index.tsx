import {
    Autocomplete,
    Box,
    Button,
    Divider,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";

import {
    Controller,
    useFieldArray,
    useForm
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { orderSchema } from "../../../../schemas/order.schema";

import type {
    CreateOrderDTO,
    Order
} from "../../../../types/order";

import type { Client } from "../../../../types/client";
import type { Product } from "../../../../types/product";

import { clientService } from "../../../../services/client.service";
import { productService } from "../../../../services/product.service";

interface OrderFormProps {

    order?: Order;

    onSubmit: (data: CreateOrderDTO) => void;

    onCancel: () => void;

}

export function OrderForm({

    order,

    onSubmit,

    onCancel

}: OrderFormProps) {

    const [clients, setClients] = useState<Client[]>([]);

    const [products, setProducts] = useState<Product[]>([]);

    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);

    const [selectedQuantity, setSelectedQuantity] =
        useState(1);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        }
    } = useForm<CreateOrderDTO>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            clientId: order?.clientId ?? 0,
            items: order?.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            })) ?? []
        }
    });

    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control,
        name: "items"
    });

    const items = watch("items");

    useEffect(() => {

        async function loadData() {

            const [
                clientsData,
                productsData
            ] = await Promise.all([

                clientService.getAll(),

                productService.findAll()

            ]);

            setClients(clientsData);

            setProducts(productsData);

        }

        loadData();

    }, []);

    function handleAddProduct() {

        if (!selectedProduct) {
            return;
        }

        if (selectedQuantity <= 0) {
            return;
        }

        const existingIndex = items.findIndex(
            item =>
                item.productId === selectedProduct.id
        );

        if (existingIndex >= 0) {

            setValue(
                `items.${existingIndex}.quantity`,
                items[existingIndex].quantity +
                selectedQuantity
            );

        } else {

            append({
                productId: selectedProduct.id,
                quantity: selectedQuantity
            });

        }

        setSelectedProduct(null);

        setSelectedQuantity(1);

    }

    function handleFormSubmit(data: CreateOrderDTO) {

        onSubmit(data);

    }

    function getProduct(productId: number) {

        return products.find(
            product => product.id === productId
        );

    }

    function getItemTotal(
        productId: number,
        quantity: number
    ) {

        const product = getProduct(productId);

        if (!product) {
            return 0;
        }

        return Number(product.price) * quantity;

    }

    const total = items.reduce(
        (sum, item) =>
            sum +
            getItemTotal(
                item.productId,
                item.quantity
            ),
        0
    );

    return (

        <Box
            component="form"
            onSubmit={handleSubmit(handleFormSubmit)}
        >

            <Stack spacing={3}>

                <Controller
                    name="clientId"
                    control={control}
                    render={({ field }) => (

                        <Autocomplete
                            options={clients}
                            value={
                                clients.find(
                                    client =>
                                        client.id === field.value
                                ) ?? null
                            }
                            getOptionLabel={
                                client => client.name
                            }
                            onChange={(_, value) => {

                                field.onChange(
                                    value?.id ?? 0
                                );

                            }}
                            renderInput={params => (

                                <TextField
                                    {...params}
                                    label="Cliente"
                                    error={
                                        !!errors.clientId
                                    }
                                    helperText={
                                        errors.clientId?.message
                                    }
                                    required
                                />

                            )}
                        />

                    )}
                />

                <Divider />

                <Typography variant="h6">
                    Adicionar produto
                </Typography>

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    spacing={2}
                    sx={{
                        alignItems: "center"
                    }}
                >

                    <Autocomplete
                        fullWidth
                        options={products}
                        value={selectedProduct}
                        getOptionLabel={
                            product =>
                                `${product.name} - ${Number(product.price).toLocaleString(
                                    "pt-BR",
                                    {
                                        style: "currency",
                                        currency: "BRL"
                                    }
                                )}`
                        }
                        onChange={(_, value) =>
                            setSelectedProduct(value)
                        }
                        renderInput={params => (

                            <TextField
                                {...params}
                                label="Produto"
                            />

                        )}
                    />

                    <TextField
                        label="Quantidade"
                        type="number"
                        value={selectedQuantity}
                        onChange={event =>
                            setSelectedQuantity(
                                Number(event.target.value)
                            )
                        }
                        slotProps={{
                            htmlInput: {
                                min: 1
                            }
                        }}
                        sx={{
                            width: {
                                xs: "100%",
                                sm: 140
                            }
                        }}
                    />

                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAddProduct}
                        sx={{
                            minWidth: 140
                        }}
                    >
                        Adicionar
                    </Button>

                </Stack>

                {errors.items?.message && (

                    <Typography
                        color="error"
                        variant="body2"
                    >
                        {errors.items.message}
                    </Typography>

                )}

                <TableContainer
                    component={Paper}
                    variant="outlined"
                >

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Produto
                                </TableCell>

                                <TableCell>
                                    Quantidade
                                </TableCell>

                                <TableCell>
                                    Valor
                                </TableCell>

                                <TableCell>
                                    Total
                                </TableCell>

                                <TableCell align="center">
                                    Ação
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {fields.length === 0 ? (

                                <TableRow>

                                    <TableCell
                                        colSpan={5}
                                        align="center"
                                    >

                                        <Typography
                                            color="text.secondary"
                                        >
                                            Nenhum produto
                                            adicionado.
                                        </Typography>

                                    </TableCell>

                                </TableRow>

                            ) : (

                                fields.map(
                                    (field, index) => {

                                        const product =
                                            getProduct(
                                                field.productId
                                            );

                                        return (

                                            <TableRow
                                                key={field.id}
                                            >

                                                <TableCell>

                                                    {product?.name ??
                                                        "Produto não encontrado"}

                                                </TableCell>

                                                <TableCell>

                                                    {items[index]?.quantity}

                                                </TableCell>

                                                <TableCell>

                                                    {Number(
                                                        product?.price ?? 0
                                                    ).toLocaleString(
                                                        "pt-BR",
                                                        {
                                                            style:
                                                                "currency",
                                                            currency:
                                                                "BRL"
                                                        }
                                                    )}

                                                </TableCell>

                                                <TableCell>

                                                    {getItemTotal(
                                                        field.productId,
                                                        items[index]
                                                            ?.quantity ?? 0
                                                    ).toLocaleString(
                                                        "pt-BR",
                                                        {
                                                            style:
                                                                "currency",
                                                            currency:
                                                                "BRL"
                                                        }
                                                    )}

                                                </TableCell>

                                                <TableCell align="center">

                                                    <IconButton
                                                        color="error"
                                                        onClick={() =>
                                                            remove(index)
                                                        }
                                                    >

                                                        <DeleteIcon />

                                                    </IconButton>

                                                </TableCell>

                                            </TableRow>

                                        );

                                    }
                                )

                            )}

                        </TableBody>

                    </Table>

                </TableContainer>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >

                    <Typography variant="h6">

                        Total:{" "}

                        {total.toLocaleString(
                            "pt-BR",
                            {
                                style: "currency",
                                currency: "BRL"
                            }
                        )}

                    </Typography>

                </Box>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "flex-end"
                    }}
                >

                    <Button
                        variant="outlined"
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Salvar
                    </Button>

                </Stack>

            </Stack>

        </Box>

    );

}