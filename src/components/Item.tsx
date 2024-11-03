import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton
} from '@ionic/react';
import { useContext } from 'react';
import { CartContext } from './../contexts/ShoppingCartContext';
import { ItemProps } from '../model/ItemProps';
import { Link } from 'react-router-dom';



const Item: React.FC = ({ visible, product, editable }: ItemProps) => {

    const { addItemToCart, deleteItemToCart } = useContext(CartContext);

    return (
        <IonCard color="light">
            <img alt={product.name} src={product.imgUrl} />
            <IonCardHeader>
                <IonCardTitle>{product.name}</IonCardTitle>
                <IonCardSubtitle>{product.price}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{product.description}</IonCardContent>
            {visible && <IonButton onClick={() => addItemToCart(product)}>Add Product</IonButton>}
            {visible && <IonButton onClick={() => deleteItemToCart(product)}>Delete Product</IonButton>}
            {editable && <Link to={{ pathname: '/Product', state: { product } }}>Edit Product</Link>}
        </IonCard>
    );

};

export default Item;