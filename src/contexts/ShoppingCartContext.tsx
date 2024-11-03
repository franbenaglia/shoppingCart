import { createContext, useState } from "react";
import { ItemsProduct } from './../model/ItemsProduct';
import { Product } from "../model/Product";

export const CartContext = createContext(null);

export const ShoppingCartProvider = ({ children }) => {

  const [cart, setCart] = useState([] as ItemsProduct[]);

  const checkOutList =  cart.filter((c: ItemsProduct) => c.quantity > 0);

  const addItemToCart = (product: Product) => {

    let ip: ItemsProduct[] = cart.filter((c: ItemsProduct) => c.product.id === product.id);

    if (ip.length > 0) {
      const newCart = cart.reduce((acc: ItemsProduct[], curr: ItemsProduct) => {
        if (curr.product.id === product.id) {
          const itemsProduct = { product: curr.product, quantity: curr.quantity + 1 } as ItemsProduct;
          acc.push(itemsProduct);
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);
      setCart(newCart);
    } else {
      const itemsProduct = { product: product, quantity: 1 } as ItemsProduct;
      cart.push(itemsProduct);
      setCart(cart);
    }

  }

  const deleteItemToCart = (product: Product) => {

    let ip: ItemsProduct[] = cart.filter((c: ItemsProduct) => c.product.id === product.id);

    if (ip.length > 0) {
      const newCart = cart.reduce((acc: ItemsProduct[], curr: ItemsProduct) => {
        if (curr.product.id === product.id) {
          const itemsProduct = { product: curr.product, quantity: curr.quantity > 0 ? curr.quantity - 1 : 0 } as ItemsProduct;
          acc.push(itemsProduct);
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);
      setCart(newCart);
    }
  }

  const priceByProduct: number[] = cart.map(ip => ip.quantity * ip.product.price);

  const totalPrice = priceByProduct.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );



  return (
    <CartContext.Provider value={{ checkOutList, addItemToCart, deleteItemToCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
