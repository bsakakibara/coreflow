import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Tooltip,
    TablePagination,
    Chip
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";

import { PageLoader } from "../../../../components/common/PageLoader";

import { useAuth } from "../../../../contexts/AuthContext";

import type { Order } from "../../../../types/order";

interface OrderTableProps {

    orders: Order[];

    loading: boolean;

    onEdit: (order: Order) => void;

    onDelete: (order: Order) => void;

}

export function OrderTable({

    orders,

    loading,

    onEdit,

    onDelete

}: OrderTableProps) {

    const { user } = useAuth();

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    function handleChangePage(
        _: unknown,
        newPage: number
    ) {

        setPage(newPage);

    }

    function handleChangeRowsPerPage(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        setRowsPerPage(Number(event.target.value));

        setPage(0);

    }

    if (loading) {

        return <PageLoader />;

    }

    return (

        <TableContainer component={Paper}>

            <Table>

                <TableHead>

                    <TableRow>

                        <TableCell>ID</TableCell>

                        <TableCell>Cliente</TableCell>

                        <TableCell>Status</TableCell>

                        <TableCell>Total</TableCell>

                        <TableCell>Itens</TableCell>

                        <TableCell>Data</TableCell>

                        <TableCell align="center">
                            Ações
                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {orders.length === 0 ? (

                        <TableRow>

                            <TableCell
                                colSpan={7}
                                align="center"
                            >

                                <Typography color="text.secondary">

                                    Nenhum pedido encontrado.

                                </Typography>

                            </TableCell>

                        </TableRow>

                    ) : (

                        orders
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map(order => (

                                <TableRow key={order.id}>

                                    <TableCell>

                                        #{order.id}

                                    </TableCell>

                                    <TableCell>

                                        {order.client.name}

                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            label={order.status}
                                            color={
                                                order.status === "PENDENTE"
                                                    ? "warning"
                                                    : order.status === "CONCLUÍDO"
                                                        ? "success"
                                                        : "default"
                                            }
                                            size="small"
                                        />

                                    </TableCell>

                                    <TableCell>

                                        {Number(order.total).toLocaleString(
                                            "pt-BR",
                                            {
                                                style: "currency",
                                                currency: "BRL"
                                            }
                                        )}

                                    </TableCell>

                                    <TableCell>

                                        {order.items.length}

                                    </TableCell>

                                    <TableCell>

                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString("pt-BR")}

                                    </TableCell>

                                    <TableCell align="center">

                                        <Tooltip title="Editar">

                                            <IconButton
                                                color="primary"
                                                onClick={() => onEdit(order)}
                                            >

                                                <EditIcon />

                                            </IconButton>

                                        </Tooltip>

                                        {user?.role === "ADMIN" && (

                                            <Tooltip title="Excluir">

                                                <IconButton
                                                    color="error"
                                                    onClick={() => onDelete(order)}
                                                >

                                                    <DeleteIcon />

                                                </IconButton>

                                            </Tooltip>

                                        )}

                                    </TableCell>

                                </TableRow>

                            ))

                    )}

                </TableBody>

            </Table>

            <TablePagination
                component="div"
                count={orders.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 20, 50]}
            />

        </TableContainer>

    );

}