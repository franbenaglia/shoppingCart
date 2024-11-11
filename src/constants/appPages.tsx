interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp } from 'ionicons/icons';

export const AppPages: AppPage[] = [
    {
        title: 'Inbox',
        url: '/folder/Inbox',
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Stripe',
        url: '/Stripe',
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'ShoppingCart',
        url: '/ShoppingCart',
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Checkout',
        url: '/Checkout',
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Product',
        url: '/Product',
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'ProductList',
        url: '/ProductList',
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Logout',
        url: '/Logout',
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
];