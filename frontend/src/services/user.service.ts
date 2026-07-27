import { api } from "./api";
import type {
    User,
    CreateUserDTO,
    UpdateUserDTO
} from "../types/user";

class UserService {

    async getAll() {
        const response = await api.get<User[]>("/users");

        return response.data;
    }

    async create(data: CreateUserDTO) {
        const response = await api.post<User>(
            "/users",
            data
        );

        return response.data;
    }

    async update(
        id: number,
        data: UpdateUserDTO
    ) {
        const response = await api.put<User>(
            `/users/${id}`,
            data
        );

        return response.data;
    }

    async delete(id: number) {
        await api.delete(`/users/${id}`);
    }

}

export const userService = new UserService();