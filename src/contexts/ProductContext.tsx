import { createContext, useEffect, useState } from "react";
import { ProductStock } from "../model/ProductStock";
import {
    handleCreate as create, handleDelete as del,
    handleUpdate as update, fetchDataById as fetchById, fetchAllData as fetchAll
} from '../api/ProductApi';
import { Product } from "../model/Product";

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([] as ProductStock[]);

    const getProducts = () => {
        return products;
    }

    const fetchProducts = async () => {
        const data = await fetchAll();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCreate = async (newData: Product) => {
        await create(newData);
        await fetchProducts();
    };
    const handleDelete = async (id: number) => {
        await del(id)
        await fetchProducts();
    };
    const handleUpdate = async (newData: Product) => {
        await update(newData);
        await fetchProducts();
    };
    const fetchProductById = (id: number) => fetchById(id);

    return (
        <ProductContext.Provider value={{ getProducts, handleCreate, handleDelete, handleUpdate, fetchProductById }}>
            {children}
        </ProductContext.Provider>
    );

}