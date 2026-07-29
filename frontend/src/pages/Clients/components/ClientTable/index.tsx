import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Box,
    Typography,
    IconButton,
    Tooltip,
    TablePagination
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Client } from "../../../../types/client";

import { useAuth } from "../../../../contexts/AuthContext";
import { useState } from "react";
import { formatDocument, formatPhone } from "../../../../utils/format";

interface ClientTableProps {
    clients: Client[];
    loading: boolean;
    onEdit: (client: Client) => void;
    onDelete: (client: Client) => void;
}

export function ClientTable({
    clients,
    loading,
    onEdit,
    onDelete
}: ClientTableProps) {

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
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 6
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (

        <TableContainer component={Paper}>

            <Table>

                <TableHead>

                    <TableRow>

                        <TableCell>Nome</TableCell>

                        <TableCell>E-mail</TableCell>

                        <TableCell>Telefone</TableCell>

                        <TableCell>Documento</TableCell>

                        <TableCell align="center">
                            Ações
                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {clients.length === 0 ? (

                        <TableRow>

                            <TableCell
                                colSpan={5}
                                align="center"
                            >

                                <Typography color="text.secondary">

                                    Nenhum cliente encontrado.

                                </Typography>

                            </TableCell>

                        </TableRow>

                    ) : (

                        clients
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map(client => (

                                <TableRow key={client.id}>

                                    <TableCell>

                                        {client.name}

                                    </TableCell>

                                    <TableCell>

                                        {client.email ?? "-"}

                                    </TableCell>

                                    <TableCell>

                                        {formatPhone(client.phone)}

                                    </TableCell>

                                    <TableCell>

                                        {formatDocument(client.document)}

                                    </TableCell>

                                    <TableCell align="center">

                                        <Tooltip title="Editar">

                                            <IconButton
                                                color="primary"
                                                onClick={() => onEdit(client)}
                                            >

                                                <EditIcon />

                                            </IconButton>

                                        </Tooltip>

                                        {user?.role === "ADMIN" && (

                                            <Tooltip title="Excluir">

                                                <IconButton
                                                    color="error"
                                                    onClick={() => onDelete(client)}
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
                count={clients.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 20, 50]}
            />

        </TableContainer>

    );

}