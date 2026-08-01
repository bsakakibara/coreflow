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
    TablePagination
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Product } from "../../../../types/product";

import { useAuth } from "../../../../contexts/AuthContext";
import { useState } from "react";
import { PageLoader } from "../../../../components/common/PageLoader";

interface ProductTableProps {
    products: Product[];
    loading: boolean;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

export function ProductTable({
    products,
    loading,
    onEdit,
    onDelete
}: ProductTableProps) {

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

                        <TableCell>Nome</TableCell>

                        <TableCell>Descrição</TableCell>

                        <TableCell>SKU</TableCell>

                        <TableCell>Preço</TableCell>

                        <TableCell>Estoque</TableCell>

                        <TableCell align="center">
                            Ações
                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {products.length === 0 ? (

                        <TableRow>

                            <TableCell
                                colSpan={6}
                                align="center"
                            >

                                <Typography color="text.secondary">
                                    Nenhum produto encontrado.
                                </Typography>

                            </TableCell>

                        </TableRow>

                    ) : (

                        products
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map(product => (

                                <TableRow key={product.id}>

                                    <TableCell>
                                        {product.name}
                                    </TableCell>

                                    <TableCell>
                                        {product.description ?? "-"}
                                    </TableCell>

                                    <TableCell>
                                        {product.sku ?? "-"}
                                    </TableCell>

                                    <TableCell>
                                        {Number(product.price).toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL"
                                        })}
                                    </TableCell>

                                    <TableCell>
                                        {product.stock}
                                    </TableCell>

                                    <TableCell align="center">

                                        <Tooltip title="Editar">

                                            <IconButton
                                                color="primary"
                                                onClick={() => onEdit(product)}
                                            >
                                                <EditIcon />
                                            </IconButton>

                                        </Tooltip>

                                        {user?.role === "ADMIN" && (

                                            <Tooltip title="Excluir">

                                                <IconButton
                                                    color="error"
                                                    onClick={() => onDelete(product)}
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
                count={products.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 20, 50]}
            />

        </TableContainer>

    );

}