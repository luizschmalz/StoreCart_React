
import type { ProductType } from './ProductType.type';

export type CartContextType = {
  cart: ProductType[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  clearCartPayed : () => void;
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  
};