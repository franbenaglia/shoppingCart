import { IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Page.css';
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { confirmPayment } from '../api/SaleApi';
import { SaleContext } from '../contexts/SaleContext';
import { Preferences } from '@capacitor/preferences';

const SALE_ID = 'saleid';

const SuccessPaymentPage: React.FC = () => {

    //const [sale, setSale] = useContext(SaleContext);

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const param1 = searchParams.get("redirect_status");
    const param2 = searchParams.get("payment_intent");

    const _confirmPayment = async () => {
        const { value } = await Preferences.get({ key: SALE_ID });
        confirmPayment(param2, value);
    }

    useEffect(() => {
        if (param1 === 'succeeded') {
            _confirmPayment();
        }
    }, [param1, param2]);

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
