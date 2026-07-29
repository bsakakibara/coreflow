import type { UserRole } from "./auth";

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}

export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface UpdateUserDTO {
    name?: string;
    email?: string;
    role?: UserRole;
}