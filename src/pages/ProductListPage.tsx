import {
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonListHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,

} from '@ionic/react';
import useCRUDProduct from '../hooks/useCRUDProduct';
import { useEffect, useState } from 'react';
import { Product } from '../model/Product';
import Item from '../components/Item';


const ProductListPage: React.FC = () => {

    const { fetchAllData } = useCRUDProduct();

    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        const data = await fetchAllData();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const List = () => {

        if (products && products.length > 0) {

            return (
                <IonList>
                    <IonListHeader>Products</IonListHeader>
                    {products && products.map((product, idx) => {
                        let ips: any = { visible: false, product: product, editable: true };
                        return <Item {...ips} key={idx} />;
                    })}
                </IonList>
            );
        } else {

            return (
                <IonList>
                    <IonListHeader>Products</IonListHeader>
                    <IonItem>
                        No products
                    </IonItem>
                </IonList>
            );

        }

    }

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Product</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Product</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <List />

            </IonContent>
        </IonPage>

    );

};

export default ProductListPage;


