import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import StripePage from './pages/StripePage';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import ShoppingCart from './pages/ShoppingCart';
import CheckoutPage from './pages/CheckoutPage';
import ProductPage from './pages/ProductPage';
import ProductListPage from './pages/ProductListPage';
import { useCookies } from 'react-cookie';
import { setGoogleJwtToken } from './helpers/AuthHelper';

setupIonicReact();

const App: React.FC = () => {

  const [cookies] = useCookies(['googleJwtToken']);

  if (cookies.googleJwtToken) {
    setGoogleJwtToken(cookies.googleJwtToken)
  }
  
  return (
    <IonApp>
      <ShoppingCartProvider>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to="/folder/Inbox" />
              </Route>
              <Route path="/ShoppingCart" exact={true}>
                <ShoppingCart />
              </Route>
              <Route path="/Checkout" exact={true}>
                <CheckoutPage />
              </Route>
              <Route path="/Stripe" exact={true}>
                <StripePage />
              </Route>
              {
                //<Route path="/Product/:productId" exact={true}>
                //  <ProductPage />
                //</Route>
              }
              <Route path="/Product" exact={true}>
                <ProductPage />
              </Route>
              <Route path="/ProductList" exact={true}>
                <ProductListPage />
              </Route>
              <Route path="/folder/:name" exact={true}>
                <Page />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </ShoppingCartProvider>
    </IonApp>
  );
};

export default App;
