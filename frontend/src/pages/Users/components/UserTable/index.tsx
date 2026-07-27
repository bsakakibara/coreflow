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
    Typography
} from "@mui/material";

import type { User } from "../../../../types/user";

interface UserTableProps {
    users: User[];
    loading: boolean;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
    IconButton,
    Tooltip,
} from "@mui/material";

export function UserTable({
    users,
    loading,
    onEdit,
    onDelete
}: UserTableProps) {

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

                        <TableCell>Perfil</TableCell>

                        <TableCell align="center">
                            Ações
                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {users.length === 0 ? (

                        <TableRow>

                            <TableCell
                                colSpan={4}
                                align="center"
                            >

                                <Typography color="text.secondary">

                                    Nenhum usuário encontrado.

                                </Typography>

                            </TableCell>

                        </TableRow>

                    ) : (

                        users.map(user => (

                            <TableRow key={user.id}>

                                <TableCell>

                                    {user.name}

                                </TableCell>

                                <TableCell>

                                    {user.email}

                                </TableCell>

                                <TableCell>

                                    {user.role}

                                </TableCell>

                                <TableCell align="center">

                                    <Tooltip title="Editar">

                                        <IconButton
                                            color="primary"
                                            onClick={() => onEdit(user)}
                                        >
                                            <EditIcon />
                                        </IconButton>

                                    </Tooltip>

                                    <Tooltip title="Excluir">

                                        <IconButton
                                            color="error"
                                            onClick={() => onDelete(user)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>

                                    </Tooltip>

                                </TableCell>

                            </TableRow>

                        ))

                    )}

                </TableBody>

            </Table>

        </TableContainer>

    );

}