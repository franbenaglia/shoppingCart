import { createContext, useEffect, useState } from "react";
import { ItemsProduct } from './../model/ItemsProduct';
import { Product } from "../model/Product";
import { Preferences } from '@capacitor/preferences';

const CHECKOUT_LIST = 'checkoutlist';

export const CartContext = createContext(null);

export const ShoppingCartProvider = ({ children }) => {

  const [cart, setCart] = useState([] as ItemsProduct[]);

  //const [idSale, setIdSale] = useState(null);

  const fetchItems = async () => {
    const items = (await Preferences.get({ key: CHECKOUT_LIST })).value;
    if (items) {
      const it: ItemsProduct[] = JSON.parse(items);
      setCart(it);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const checkOutList = () => cart.filter((c: ItemsProduct) => c.quantity > 0);

  const addItemToCart = async (product: Product) => {

    let ip: ItemsProduct[] = cart.filter((c: ItemsProduct) => c.product._id === product._id);

    if (ip.length > 0) {
      const newCart = cart.reduce((acc: ItemsProduct[], curr: ItemsProduct) => {
        if (curr.product._id === product._id) {
          const itemsProduct = { product: curr.product, quantity: curr.quantity + 1 } as ItemsProduct;
          acc.push(itemsProduct);
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);
      setCart(newCart);
      setPreferences(newCart);
    } else {
      const itemsProduct = { product: product, quantity: 1 } as ItemsProduct;
      cart.push(itemsProduct);
      //setCart(cart);
      setCart(() => {
        const newCount = cart;
        return newCount;
      });
      setPreferences(cart);
    }
  }

  const deleteItemToCart = (product: Product) => {

    let ip: ItemsProduct[] = cart.filter((c: ItemsProduct) => c.product._id === product._id);

    if (ip.length > 0) {
      const newCart = cart.reduce((acc: ItemsProduct[], curr: ItemsProduct) => {
        if (curr.product._id === product._id) {
          const itemsProduct = { product: curr.product, quantity: curr.quantity > 0 ? curr.quantity - 1 : 0 } as ItemsProduct;
          acc.push(itemsProduct);
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);
      setCart(newCart);
      setPreferences(newCart);
    }
  }

  const deleteAllCartItems = () => {
    setPreferences([]);
    setCart([]);
  }

  const priceByProduct: number[] = cart.map(ip => ip.quantity * ip.product.price);

  const totalPrice = () => priceByProduct.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );


  const setPreferences = async (ip: ItemsProduct[]) => {
    await Preferences.set({
      key: CHECKOUT_LIST,
      value: JSON.stringify(ip),
    });
  };

  return (
    <CartContext.Provider value={{ checkOutList, addItemToCart, deleteItemToCart, totalPrice, deleteAllCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
