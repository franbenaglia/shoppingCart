import axios from "axios";
import { Product } from "../model/Product";
import { useState } from "react";

const URL_RESOURCE_SERVER = 'http://localhost:3000';
const baseURL = URL_RESOURCE_SERVER + "/product/";

const useCRUDProduct = () => {

    const [products, setProducts] = useState<Product[]>(null);
    const [product, setProduct] = useState<Product>(null);

    const handleCreate = async (newData: Product) => {
        try {
            await axios.post(baseURL, { newData });
        } catch (error) {
            console.error('Error creating data:', error);
        }
    };

    const fetchAllData = async () => {
        try {
            const response = await axios.get(baseURL);
            setProducts(response.data);
            return products;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleUpdate = async (updatedData: Product) => {
        try {
            await axios.put(baseURL, { updatedData });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(baseURL + id);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const fetchDataById = async (id: number) => {
        try {
            const response = await axios.get(baseURL + id);
            setProduct(response.data);
            return product;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const crudMethods = {
        fetchAllData,
        handleCreate,
        handleUpdate,
        handleDelete,
        fetchDataById
    };

    return crudMethods;

}

export default useCRUDProduct;