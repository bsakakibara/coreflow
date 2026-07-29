export interface LoginFormData {
    email: string;
    password: string;
}

export type UserRole = "ADMIN" | "EMPLOYEE";

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}

export interface LoginResponse {
    token: string;
    user: User;
}