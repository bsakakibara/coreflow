export interface Product {
    id: number;
    name: string;
    description: string | null;
    sku: string | null;
    price: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProductDTO {
    name: string;
    description?: string;
    sku?: string;
    price: number;
    stock: number;
}

export interface UpdateProductDTO
    extends Partial<CreateProductDTO> { }