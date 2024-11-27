import { IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Page.css';
import { useLocation } from 'react-router-dom';
import { confirmPayment } from '../api/SaleApi';
import { Preferences } from '@capacitor/preferences';
import { useContext, useEffect } from 'react';
import { ItemsProduct } from '../model/ItemsProduct';
import { changeProductStateToBuyed } from '../api/StockApi';
import { CartContext } from '../contexts/ShoppingCartContext';

const SALE_ID = 'saleid';

const CHECKOUT_LIST = 'checkoutlist';

const SuccessPaymentPage: React.FC = () => {

    //const [sale, setSale] = useContext(SaleContext);
    const { checkOutList } = useContext(CartContext);
    //const cl = checkOutList(); //  dont work why?
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const param1 = searchParams.get("redirect_status");
    const param2 = searchParams.get("payment_intent");

    const fetchItems = async () => {
        let it: ItemsProduct[] = [];
        const items = (await Preferences.get({ key: CHECKOUT_LIST })).value;
        if (items) {
            it = JSON.parse(items);
        }
        return it;
    }

    const _confirmPayment = async () => {

        const { value } = await Preferences.get({ key: SALE_ID });
        //TODO confirmPayment & changeProductStateToBuyed in one operation?
        await confirmPayment(param2, value);
        const cl = await fetchItems();
        await changeProductStateToBuyed(cl);
        removePreferences(CHECKOUT_LIST, []);
        removePreferences(SALE_ID, null);
    }

    useEffect(() => {
        if (param1 === 'succeeded') {
            _confirmPayment();
        }
    }, [param1, param2]);

    const removePreferences = async (key: string, value: any) => {
        await Preferences.set({
            key: key,
            value: JSON.stringify([]),
        });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>SuccessPaymentPage</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">SuccessPayment</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonItem>
                    <IonLabel color="danger">SUCCESSFUL PAYMENT</IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel color="primary">ID:{param2}</IonLabel>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default SuccessPaymentPage;


