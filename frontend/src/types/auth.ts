export interface LoginFormData {
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}