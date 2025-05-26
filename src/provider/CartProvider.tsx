import { useState } from 'react';
import type { ReactNode } from "react";
import type { ProductType } from '../types/ProductType.type';
import { CartContext } from '../context/CartContext';
import { useEffect } from 'react';
import products_items from '../components/Product/products-items';

const CART_STORAGE_KEY = 'cart_items';
const STOCK_STORAGE_KEY = 'product_stock';


export const CartProvider = ({ children }: { children: ReactNode }) => {

    //corrigindo para evitar erro de inicialização
  useEffect(() => {
  const isInitialized = localStorage.getItem('is_initialized');

  if (!isInitialized) {
    localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(products_items));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
    localStorage.setItem('is_initialized', 'true');
  }
}, []);

  const [cart, setCart] = useState<ProductType[]>(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const loadStockFromStorage = (): ProductType[] => {
    const stored = localStorage.getItem(STOCK_STORAGE_KEY);
    return stored ? JSON.parse(stored) : products_items;
  };

  const [products, setProducts] = useState<ProductType[]>(() => loadStockFromStorage());


  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductType) => {
    const existingItem = cart.find(item => item.id === product.id);
  
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, qtd: item.qtd + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart(prev => [...prev, { ...product, qtd: 1 }]);
    }
  
    const updatedProducts = products.map(p =>
      p.id === product.id ? { ...p, qtd: p.qtd - 1 } : p
    );
    setProducts(updatedProducts);
    saveStockToStorage(updatedProducts);
  };
  
  const removeFromCart = (index: number) => {
    const itemToRemove = cart[index];
    if (!itemToRemove) return;
  
    let newCart: ProductType[];
  
    if (itemToRemove.qtd > 1) {
      newCart = cart.map((item, i) =>
        i === index ? { ...item, qtd: item.qtd - 1 } : item
      );
    } else {
      newCart = [...cart];
      newCart.splice(index, 1);
    }
  
    setCart(newCart);
  
    const updatedProducts = products.map(p =>
      p.id === itemToRemove.id ? { ...p, qtd: p.qtd + 1 } : p
    );
    setProducts(updatedProducts);
    saveStockToStorage(updatedProducts);
  };
  

  const clearCart = () => {
    const updatedProducts = [...products];
  
    cart.forEach(cartItem => {
      const index = updatedProducts.findIndex(p => p.id === cartItem.id);
      if (index !== -1) {
        updatedProducts[index] = {
          ...updatedProducts[index],
          qtd: updatedProducts[index].qtd + (cartItem.qtd ?? 1),
        };
      }
    });
  
    setProducts(updatedProducts);
    setCart([]);
    saveStockToStorage(updatedProducts);
  };

  const clearCartPayed = () =>{
    setCart([]);
  }
  
  
  const saveStockToStorage = (products: ProductType[]) => {
    localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(products));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, clearCartPayed, products, setProducts}}>
      {children}
    </CartContext.Provider>
  );
};
