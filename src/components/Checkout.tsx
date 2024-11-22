import {
    IonButton,
    IonItem,
    IonList,
    IonListHeader
} from '@ionic/react';

import Item from './Item';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/ShoppingCartContext';
import { proceedCheckOut } from '../api/SaleApi';
import { Sale } from '../model/Sale';
import { User } from '../model/User';
import { StripeComponent } from './Stripe';
import { SaleContext } from '../contexts/SaleContext';
import { Preferences } from '@capacitor/preferences';

const SALE_ID = 'saleid';


const Checkout: React.FC = () => {

    const { totalPrice, checkOutList, deleteAllCartItems } = useContext(CartContext);
    //const [sale, setSale] = useContext(SaleContext);
    const [render, setRender] = useState(false);
    const clist = checkOutList();

    useEffect(() => {
        //setSale("foo"); //funciona
    });

    const deleteCart = async () => {
        deleteAllCartItems();
    }

    const proceed = async () => {

        const osale: Sale = new Sale();

        //TODO get from logged user service
        const user: User = new User();
        user.login = 'user1';

        osale.user = user;
        osale.itemProducts = clist;

        const data: any = (await proceedCheckOut(osale)).data;

        setRender(data && data.sale && data.sale._id);
        if (data && data.sale && data.sale._id) {
            //setSale(data.sale._id);
            await Preferences.set({
                key: SALE_ID,
                value: data.sale._id,
            });
        }
    }

    return (
        <IonList>
            <IonListHeader>Products, amount: {totalPrice()}</IonListHeader>
            {clist && clist.map((ip, idx) => {
                const ips: any = { visible: false, product: ip.product, quantity: ip.quantity };
                return <Item {...ips} key={idx} />;
            })}
            {clist && clist.length > 0 &&
                <IonItem>
                    <IonButton onClick={() => proceed()}>Proceed</IonButton>
                    <IonButton onClick={() => deleteCart()}>Delete Cart</IonButton>
                </IonItem>
            }
            {render && <IonItem>
                <StripeComponent />
            </IonItem>}
        </IonList>
    );
};

export default Checkout;