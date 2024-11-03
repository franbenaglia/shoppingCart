import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ProductComponent from '../components/ProductComponent';
import './Page.css';
import { Product } from '../model/Product';

const ProductPage: React.FC = ({ props }: any) => {

    //const productId = props.match.params.productId;
    //const p = location.state.product;
    let p : any;
    if (props && props.location) {
        p = props.location.state.product;
    }
    //const product: any = {} as Product;

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
                <ProductComponent {...p} />
            </IonContent>
        </IonPage>
    );
};

export default ProductPage;