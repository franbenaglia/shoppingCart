import { useContext, useEffect, useState } from 'react';
import useCRUDProduct from '../hooks/useCRUDProduct';
import { useForm, SubmitHandler } from "react-hook-form";
import { IonButton, IonInput, IonItem, IonList, IonInputPasswordToggle } from '@ionic/react';
import { User } from '../model/User';
import { login } from '../helpers/AuthHelper';


const Login: React.FC = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<User>();

    const onSubmit: SubmitHandler<User> = data => {
        console.log(data);
        login(data); // MUST RETURN SOMETHING
    }

    //console.log(watch("example"))

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <IonList>
                <IonItem>
                    <IonInput label="login" defaultValue="" {...register("login", { required: true })} ></IonInput>
                    {errors.login && <span>Login is required</span>}
                </IonItem>
                <IonItem>
                    <IonInputPasswordToggle  {...register("password", { required: true })}></IonInputPasswordToggle>
                    {errors.password && <span>Password is required</span>}
                </IonItem>
                <IonItem>
                    <IonButton type="submit">Accept</IonButton>
                </IonItem>

            </IonList>
        </form>
    );
}

export default Login;