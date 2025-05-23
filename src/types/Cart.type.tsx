
import type { ProductType } from './Product.type';

export type CartContextType = {
  cart: ProductType[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};