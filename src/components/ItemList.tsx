import {
    IonList,
    IonListHeader
} from '@ionic/react';

import storeItems from "../data/products.json";

import axios from 'axios';

import Item from './Item';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/ShoppingCartContext';

const ItemList: React.FC = () => {

    const { totalPrice } = useContext(CartContext);
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.example.com/data');
                setApiData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <IonList>
            <IonListHeader>Products, amount: {totalPrice}</IonListHeader>
            {storeItems.map((product, idx) => {
                const ips: any = { visible: true, product: product, editable: false };
                return <Item {...ips} />;
            })}
        </IonList>
    );
};

export default ItemList;