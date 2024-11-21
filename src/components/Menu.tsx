import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import './Menu.css';
import { getUser } from '../api/UserApi';
import { useState } from 'react';
import { AppPages } from '../constants/appPages';


const Menu: React.FC = () => {

  const location = useLocation();

  let [userlogged, setUserlogged] = useState({ login: 'Anonimo' });

  /*
  const [toggle, setToggle] = useState(true);

  const customRoute = (appPage: any) => {

    let newurl = appPage.url;

    if (appPage.url === '/ProductList') {
      setToggle(!toggle);
      newurl = '/ProductList/' + toggle;
    }

    return newurl;

  }

  */

  const MenuList = () => {

    return (
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>Options</IonListHeader>
            <IonNote>{userlogged ? userlogged.login : ''}</IonNote>
            {AppPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                    <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
          </IonList>
        </IonContent>
      </IonMenu>
    );

  }

  return (
    <MenuList />
  );

};

export default Menu;
