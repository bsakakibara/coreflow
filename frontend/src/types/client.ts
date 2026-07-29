export interface Client {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    document: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateClientDTO {
    name: string;
    email?: string;
    phone?: string;
    document?: string;
}

export interface UpdateClientDTO {
    name?: string;
    email?: string;
    phone?: string;
    document?: string;
}