import { createContext } from 'react';
import type { CartContextType } from '../types/Cart.type';


export const CartContext = createContext<CartContextType | undefined>(undefined);





