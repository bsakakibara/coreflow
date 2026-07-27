import type { LoginFormData, LoginResponse } from "../types/auth";
import { api } from "./api";

class AuthService {

    async login(data: LoginFormData) {

        const response = await api.post<LoginResponse>(
            "/login",
            data
        );

        return response.data;
    }

}

export const authService = new AuthService();