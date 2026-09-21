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

    async forgotPassword(email: string) {

        const response = await api.post(
            "/forgot-password",
            { email }
        );

        return response.data;
    }

    async resetPassword(token: string, password: string) {

        const response = await api.post(
            "/reset-password",
            {
                token,
                password
            }
        );

        return response.data;
    }

}

export const authService = new AuthService();