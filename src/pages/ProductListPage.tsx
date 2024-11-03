import {
    IonList,
    IonListHeader
} from '@ionic/react';

import storeItems from "../data/products.json";

import axios from 'axios';

import { useContext, useEffect, useState } from 'react';
import Item from '../components/Item';

const ProductListPage: React.FC = () => {

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

        //fetchData();
    }, []);

    return (
        <IonList>
            <IonListHeader>Products</IonListHeader>
            {storeItems.map((product, idx) => {
                const ips: any = { visible: false, product: product, editable: true };
                return <Item {...ips}/>;
            })}
        </IonList>
    );
};

export default ProductListPage;