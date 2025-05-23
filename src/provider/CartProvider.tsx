import { useState } from 'react';
import type { ReactNode } from "react";
import type { ProductType } from '../types/Product.type';
import { CartContext } from '../context/CartContext';
import { useEffect } from 'react';

const CART_STORAGE_KEY = 'cart_items';


export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [cart, setCart] = useState<ProductType[]>(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  });
  

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductType) => {
    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => {
      const newCart = [...prev];
      newCart.splice(index, 1); 
      return newCart;
    });
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
