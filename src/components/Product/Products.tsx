import { useNavigate } from "react-router-dom";
import "./products.css"
import NavbarMarket from "../Navbar/Navbar";
import { useCart } from "../../hooks/useCart";
import { useState } from "react";
import type { ProductType } from "../../types/ProductType.type";
import { toast } from "sonner";

const Products = () => {
    const navigate = useNavigate();
    const [disabledButtons, setDisabledButtons] = useState<Record<number, boolean>>({})
    const { addToCart, products, setProducts } = useCart();
    
    const handleAddToCart = (product: ProductType) => {
      if (checkStock(product.id)) return;
    
      toast.success(`${product.name} adicionado ao carrinho! 🛒`, {
        duration: 4000,
      });
    
      setDisabledButtons(prev => ({ ...prev, [product.id]: true }));
      addToCart(product);
    
      setTimeout(() => {
        setDisabledButtons(prev => ({ ...prev, [product.id]: false }));
      }, 3000);
    };
    
    const checkStock = (id: number) => {
      const productIndex = products.findIndex(p => p.id === id);
      const product = products[productIndex];
    
      if (!product || product.qtd <= 0) {
        toast.error(`Produto ${product?.name ?? "desconhecido"} sem estoque!`, {
          duration: 4000,
        });
        return true;
      }
    
      const updatedProducts = [...products];
      updatedProducts[productIndex] = {
        ...product,
        qtd: product.qtd - 1,
      };
      setProducts(updatedProducts);
      return false;
    };
    
    console.log(products);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

    <NavbarMarket />
    <div className="products flex-grow">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        
            {products.map(product => (
            <div key={product.id} className="product-card">
                <img className="h-40 rounded-lg object-cover object-center"
                  src={product.image || '/default-image.png'}
                alt="gallery-photo" />
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-base font-bold text-green-700 mt-2">R$ {product.price.toFixed(2)}</p>
                <p> Estoque:{product.qtd}</p>
                <div className="flex gap-2">
                    <button 
                    className={`buttonCart text-white text-sm rounded-xl transition cursor-pointer
                      ${
                        disabledButtons[product.id]
                          ? "bg-gray-400 animate-pulse"
                          : product.qtd <= 0
                          ? "bg-gray-400"
                          : "bg-gray-800 hover:bg-gray-700"
                      }
                    `}
                    type="button"
                    disabled={disabledButtons[product.id]}
                    onClick={() => handleAddToCart(product)}>
                    Adicionar ao Carrinho
                    </button>
                    
                    <button
                    className="button border border-gray-300 text-gray-700 px-4 py-2 text-sm rounded-xl hover:bg-gray-100 transition"
                        type="button"
                        onClick={() => navigate(`/products/${product.id}`)}
                    >
                    Ver Detalhes
                    </button>
                </div>
            </div>
            ))}
        </div>
    </div>
    </div>
  );
}

export default Products;
