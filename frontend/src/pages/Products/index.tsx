import { useState } from "react";

import {
    Box,
    Button
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { PageHeader } from "../../components/common/PageHeader";

import { useProducts } from "../../hooks/useProducts";

import { ProductTable } from "./components/ProductTable";
import { ProductModal } from "./components/ProductModal";

import type { Product } from "../../types/product";

import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { PageActions } from "../../components/common/PageActions";
import { SearchField } from "../../components/common/SearchField";

export function Products() {

    const {
        products,
        loading,
        loadProducts,
        deleteProduct
    } = useProducts();

    const [openModal, setOpenModal] =
        useState(false);

    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);

    const [search, setSearch] = useState("");

    const filteredProducts = products.filter(product =>
        product.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        (product.sku ?? "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        (product.description ?? "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    function handleCreate() {
        setSelectedProduct(null);
        setOpenModal(true);
    }

    function handleEdit(product: Product) {
        setSelectedProduct(product);
        setOpenModal(true);
    }

    function handleCloseModal() {
        setOpenModal(false);
    }

    const [openConfirm, setOpenConfirm] =
        useState(false);

    const [productToDelete, setProductToDelete] =
        useState<Product | null>(null);

    function handleDelete(product: Product) {
        setProductToDelete(product);
        setOpenConfirm(true);
    }

    async function handleConfirmDelete() {
        if (!productToDelete) return;
        await deleteProduct(productToDelete.id);
        setOpenConfirm(false);
        setProductToDelete(null);
    }

    function handleCloseConfirm() {
        setOpenConfirm(false);
        setProductToDelete(null);
    }

    return (

        <>

            <PageHeader
                title="Produtos"
                subtitle="Gerencie os produtos cadastrados."
            >

                <PageActions>

                    <SearchField
                        value={search}
                        onChange={setSearch}
                    />

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleCreate}
                    >
                        Novo Produto
                    </Button>

                </PageActions>

            </PageHeader>

            <Box sx={{ mt: 3 }}>

                <ProductTable
                    products={filteredProducts}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

            </Box>

            <ProductModal
                open={openModal}
                product={selectedProduct}
                onClose={handleCloseModal}
                onSuccess={loadProducts}
            />

            <ConfirmDialog
                open={openConfirm}
                title="Excluir Produto"
                message={
                    `Deseja realmente excluir o produto "${productToDelete?.name}"?`
                }
                onClose={handleCloseConfirm}
                onConfirm={handleConfirmDelete}
            />

        </>

    );

}