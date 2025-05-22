import { useNavigate } from "react-router-dom";
import products from "../Product/products";
import "./products.css"
import NavbarMarket from "../Navbar/Navbar";
import { useCart } from "../../hooks/useCart";
import { useState } from "react";
import type { Product } from "../../types/Product.type";
import { toast } from "sonner";

export default function Products() {
    const navigate = useNavigate();
    const [disabledButtons, setDisabledButtons] = useState<Record<number, boolean>>({})
    const { addToCart } = useCart();
    
    const handleAddToCart = (product:Product) => {
    toast.success(`${product.name} adicionado ao carrinho! 🛒`, {
    duration: 4000,
    });

    setDisabledButtons(prev => ({ ...prev, [product.id]: true }));

    addToCart(product);


    setTimeout(() => {
      setDisabledButtons(prev => ({ ...prev, [product.id]: false }));
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

    <NavbarMarket />
    <div className="products flex-grow">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        
            {products.map(product => (
            <div key={product.id} className="product-card">
                <img className="h-40 rounded-lg object-cover object-center"
                src={product.image}
                alt="gallery-photo" />
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-base font-bold text-green-700 mt-2">R$ {product.price.toFixed(2)}</p>
                <div className="flex gap-2">
                    <button 
                    className={`buttonCart text-white text-sm rounded-xl transition cursor-pointer 
                    ${disabledButtons[product.id] 
                        ? "bg-gray-400 cursor-not-allowed animate-pulse" 
                        : "bg-gray-800 hover:bg-gray-700"}
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
