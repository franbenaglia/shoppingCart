import { useContext, useEffect, useState } from 'react';
import useCRUDProduct from '../hooks/useCRUDProduct';
import { useForm, SubmitHandler } from "react-hook-form";
import { IonButton, IonInput, IonItem, IonList, IonInputPasswordToggle, IonIcon } from '@ionic/react';
import { User } from '../model/User';
import { login, googleOauth2Login, githubOauth2Login } from '../helpers/AuthHelper';


const Login: React.FC = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<User>();

    const googleOauth2 = () => {
        googleOauth2Login();
    }

    const githubOauth2 = () => {
        githubOauth2Login();
    }

    const registerUser = () => {

    }

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
                    <IonInput label="password" {...register("password", { required: true })}></IonInput>
                    {errors.password && <span>Password is required</span>}
                </IonItem>
                <IonItem>
                    <IonButton type="submit">Accept</IonButton>
                </IonItem>
                <IonItem>
                    <IonButton type="button" onClick={() => googleOauth2()} shape="round" color="medium"
                        size="default">Google&nbsp;<IonIcon name="logo-google"></IonIcon></IonButton>
                    <IonButton type="button" onClick={() => githubOauth2()} shape="round" color="light"
                        size="default">Github&nbsp;<IonIcon name="logo-github"></IonIcon></IonButton>
                </IonItem>
                <IonItem>
                    <IonButton type="button" onClick={() => registerUser()} shape="round" color="warning"
                        size="default">Register</IonButton>
                </IonItem >
            </IonList >
        </form >
    );
}

export default Login;