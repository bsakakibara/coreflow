export interface ProductResponse {
    id: number;
    name: string;
    description: string | null;
    sku: string | null;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateProductDTO {
    name: string;
    description?: string;
    sku?: string;
    price: number;
    stock: number;
}

export interface UpdateProductDTO {
    name?: string;
    description?: string;
    sku?: string;
    price?: number;
    stock?: number;
}