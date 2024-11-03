import { useContext, useEffect, useState } from 'react';
import useCRUDProduct from '../hooks/useCRUDProduct';
import { useForm, SubmitHandler } from "react-hook-form";
import { IonButton, IonInput, IonItem, IonList, IonTextarea } from '@ionic/react';
import { Product } from '../model/Product';

type Inputs = {
    name: string,
    price: number,
    description: string,
};

const ProductComponent: React.FC = ({ ...product }: Product) => { //

    const { handleCreate, handleUpdate, handleDelete, fetchDataById } = useCRUDProduct();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const [prod, setProd] = useState<Product>();

    const fetchProduct = async () => {
        const data = await fetchDataById(product.id);
        setProd(data);
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    const onSubmit: SubmitHandler<Inputs> = data => {

        console.log(data as Product);
        if (!product.id) {
            handleCreate(data as Product);
        } else {
            handleUpdate(data as Product);
        }

    }

    const deleteProduct = () => {
        handleDelete(product.id);
    }

    //console.log(watch("example"))

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <IonList>
                <IonItem>
                    <IonInput label="Name" defaultValue="" {...register("name", { required: true })} ></IonInput>
                    {errors.name && <span>Name is required</span>}
                </IonItem>
                <IonItem>
                    <IonInput type="number" label="Price" {...register("price", { required: true })}></IonInput>
                    {errors.price && <span>Price is required</span>}
                </IonItem>
                <IonItem>
                    <IonTextarea label="Description"  {...register("description", { required: true })}></IonTextarea>
                    {errors.description && <span>Description is required</span>}
                </IonItem>
                <IonItem>
                    {product.id ? <IonButton type="submit">Update</IonButton> :
                        <IonButton type="submit">Accept</IonButton>}
                </IonItem>
                {product.id ?
                    <IonItem>
                        <IonButton onClick={() => deleteProduct()}>Delete</IonButton>
                    </IonItem> : ''}
            </IonList>
        </form>
    );
}

export default ProductComponent;