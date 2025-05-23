import { useNavigate, useParams } from "react-router-dom";
import products_items from "../Product/products-items";
import NavbarMarket from "../Navbar/Navbar";
import "./ProductDetail.css"; 

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = products_items.find(p => p.id.toString() === id);

  if (!product) return <p>Produto não encontrado.</p>;

  return (
  <div className="product-detail-page min-h-screen bg-gray-100 flex flex-col items-center">
    <NavbarMarket />
    
    <div className="container-detail flex-grow w-full bg-white rounded-lg shadow-md flex flex-col items-center">
      <img
        src={product.image} 
        alt={product.name}
        className={
          product.image === '/src/assets/celular.jpg'
            ? 'w-128 h-128 object-contain rounded-lg shadow-2xl'
            : 'w-128 h-128 object-cover rounded-lg shadow-2xl'
        }
      />

      <h1 className="product-name-text text-3xl font-bold text-gray-900 text-center">
        {product.name}
      </h1>

      <p className="product-name-text text-gray-700 text-center w-[600px] mx-auto" >
        {product.description}
      </p>

      <p className="price-tag-detail text-2xl font-semibold text-green-600" >
        R$ {product.price.toFixed(2)}
      </p>
      
      <button
        onClick={() => navigate("/")}
        className="button bg-gray-800 hover:bg-gray-400 text-white rounded-xl font-semibold transition w-full sm:w-auto"
      >
        Voltar para a Loja
      </button>
    </div>
  </div>
);

}