import axios from "axios";
import { Product } from "../model/Product";
import { getGoogleJwtToken } from "../helpers/AuthHelper";

const URL_RESOURCE_SERVER = 'http://localhost:3000';
const baseURL = URL_RESOURCE_SERVER + "/product/";


export const handleCreate = async (newData: Product) => {

    const token = await getGoogleJwtToken();

    try {

        return await axios.post(baseURL, newData, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};

export const fetchAllData = async () => {
    try {
        const response = await axios.get(baseURL);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const handleUpdate = async (updatedData: Product) => {
    try {
        return await axios.put(baseURL, { updatedData });
    } catch (error) {
        console.error('Error updating data:', error);
        return error;
    }
};

export const handleDelete = async (id: number) => {
    try {
        return await axios.delete(baseURL + id);
    } catch (error) {
        console.error('Error deleting data:', error);
        return error;
    }
};

export const fetchDataById = async (id: number) => {
    try {
        const response = await axios.get(baseURL + id);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};




