import { useEffect, useState } from "react";

import { userService } from "../services/user.service";

import type { User } from "../types/user";

export function useUsers() {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadUsers() {

        try {

            const response = await userService.getAll();

            setUsers(response);

        } finally {

            setLoading(false);

        }

    }

    async function deleteUser(id: number) {

        await userService.delete(id);

        await loadUsers();

    }

    useEffect(() => {

        loadUsers();

    }, []);

    return {
        users,
        loading,
        loadUsers,
        deleteUser
    };

}