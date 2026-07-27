import {
  Box,
  Button
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { PageHeader } from "../../components/common/PageHeader";
import { UserTable } from "./components/UserTable";

import { useState } from "react";

import { UserModal } from "./components/UserModal";
import { useUsers } from "../../hooks/useUsers";
import type { User } from "../../types/user";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";

export function Users() {

  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [userToDelete, setUserToDelete] =
    useState<User | null>(null);

  const {
    users,
    loading,
    loadUsers,
    deleteUser
  } = useUsers();

  return (

    <>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4
        }}
      >

        <PageHeader
          title="Usuários"
          subtitle="Gerencie todos os usuários do sistema."
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {

            setSelectedUser(null);

            setOpenModal(true);

          }}
        >
          Novo Usuário
        </Button>

      </Box>

      <UserTable
        users={users}
        loading={loading}
        onEdit={(user) => {

          setSelectedUser(user);

          setOpenModal(true);

        }}
        onDelete={(user) => {

          setUserToDelete(user);

          setOpenDeleteDialog(true);

        }}
      />
      <UserModal
        open={openModal}
        user={selectedUser}
        onClose={() => {

          setOpenModal(false);

          setSelectedUser(null);

        }}
        onSuccess={loadUsers}
      />

      <ConfirmDialog
        open={openDeleteDialog}
        title="Excluir usuário"
        message={
          `Tem certeza que deseja excluir ${userToDelete?.name}?`
        }
        onClose={() => {

          setOpenDeleteDialog(false);

          setUserToDelete(null);

        }}
        onConfirm={async () => {

          if (!userToDelete) return;

          await deleteUser(userToDelete.id);

          setOpenDeleteDialog(false);

          setUserToDelete(null);

        }}
      />

    </>

  );

}