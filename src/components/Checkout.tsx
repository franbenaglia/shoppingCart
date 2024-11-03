import {
    IonList,
    IonListHeader
} from '@ionic/react';

import Item from './Item';
import { useContext } from 'react';
import { CartContext } from '../contexts/ShoppingCartContext';

const Checkout: React.FC = () => {

    const { totalPrice, checkOutList } = useContext(CartContext);

    return (
        <IonList>
            <IonListHeader>Products, amount: {totalPrice}</IonListHeader>
            {checkOutList.map((ip, idx) => {
                const ips: any = { visible: false, product: ip.product };
                return <Item {...ips} />;
            })}
        </IonList>
    );
};

export default Checkout;