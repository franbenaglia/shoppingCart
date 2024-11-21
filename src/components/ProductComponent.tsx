import { useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import {
    IonButton, IonInput, IonItem, IonList, IonTextarea, IonFab, IonFabButton, IonIcon,
    IonCol,
    IonImg,
} from '@ionic/react';
import { Product } from '../model/Product';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';
import { camera } from 'ionicons/icons';
import { ProductContext } from '../contexts/ProductContext';

//import { Buffer } from 'buffer';

type Inputs = {
    name: string,
    price: number,
    description: string,
    imageDataBase64: string | Blob,
};

const ProductComponent: React.FC = ({ productId }: any) => {

    const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const [prod, setProd] = useState<Product>();

    const { photos, takePhoto, deletePhoto } = usePhotoGallery();

    const { handleCreate, handleDelete, handleUpdate, fetchProductById } = useContext(ProductContext);

    const fetchProduct = async () => {
        const data = await fetchProductById(productId);
        setProd(data);
    }

    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, []);

    const onSubmit: SubmitHandler<Inputs> = data => { //TODO replace Inputs for Product

        if (photos && photos.length > 0) {
            data.imageDataBase64 = photos[0].webviewPath;
        }


        if (!productId) {
            handleCreate(data as Product);
        } else {
            handleUpdate(data as Product);
        }

    }

    const deleteProduct = () => {
        handleDelete(productId);
    }

    //console.log(watch("example"))

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <IonList>
                <IonItem>
                    <IonInput label="Name" defaultValue="" {...register("name", { required: true })} >
                        {prod ? prod.name : ''}
                    </IonInput>
                    {errors.name && <span>Name is required</span>}
                </IonItem>
                <IonItem>
                    <IonInput type="number" label="Price" {...register("price", { required: true })}>
                        {prod ? prod.price : ''}
                    </IonInput>
                    {errors.price && <span>Price is required</span>}
                </IonItem>

                <IonItem>
                    <IonTextarea label="Description"  {...register("description", { required: true })} />
                    {errors.description && <span>Description is required</span>}
                </IonItem>
                {photos && photos.length > 0 && photos.map((photo, index) => (
                    <IonItem>
                        <IonCol size="6" key={photo.filepath}>
                            <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath as string} />
                        </IonCol>
                    </IonItem>
                ))}

                {prod && prod.imageDataBase64 && (
                    <IonItem>
                        <IonCol size="6">
                            <IonImg src={prod.imageDataBase64} />
                        </IonCol>
                    </IonItem>
                )}

                <IonItem>
                    {productId ? <IonButton type="submit">Update</IonButton> :
                        <IonButton type="submit">Accept</IonButton>}
                </IonItem>
                <IonItem>
                    {productId ? <IonButton onClick={() => deleteProduct()}>Delete</IonButton> : ''}
                </IonItem>
            </IonList>

            <IonFab vertical="bottom" horizontal="center" slot="fixed">
                <IonFabButton onClick={() => takePhoto()}>
                    <IonIcon icon={camera}></IonIcon>
                </IonFabButton>
            </IonFab>

        </form>

    );
}

export default ProductComponent;