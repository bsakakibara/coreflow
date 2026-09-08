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
import { PageActions } from "../../components/common/PageActions";
import { SearchField } from "../../components/common/SearchField";

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

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(user =>
    user.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    user.email
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleCreate() {

    setSelectedUser(null);

    setOpenModal(true);

  }

  return (

    <>
      <PageHeader
        title="Usuários"
        subtitle="Gerencie os usuários cadastrados."
      >

        <PageActions>

          <SearchField
            value={search}
            onChange={setSearch}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
          >
            <Box
              component="span"
              sx={{
                display: { xs: "none", sm: "inline" }
              }}
            >
              Novo&nbsp;
            </Box>
            Usuário
          </Button>

        </PageActions>

      </PageHeader>

      <UserTable
        users={filteredUsers}
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