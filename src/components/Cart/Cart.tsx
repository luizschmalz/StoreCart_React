import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../hooks/useCart"; 
import NavbarMarket from "../Navbar/Navbar";
import "./Cart.css"; 
import { toast } from "sonner";
import PaymentModal from "../PaymentModal/PaymentModal";


const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);


  if (cart.length === 0)
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
    <NavbarMarket />

    <div className="flex-grow container-main bg-gray-100">
    <div className="cart-container bg-white rounded-2xl shadow-md flex flex-col h-[70vh]">

      <h2 className="carrinhotext text-2xl font-bold text-center border-b border-gray-200">
        Carrinho de Compras 🛒
      </h2>

      <div className="flex-grow flex flex-col justify-center items-center ">
          <p className="text-xl text-gray-600">O carrinho está vazio.</p>
          <button
              className="button bg-gray-800 hover:bg-gray-600 text-white rounded-xl font-semibold transition"
              onClick={() => navigate("/")}
            >
              Voltar para a Loja
            </button>
        </div>

    </div>
  </div>
</div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    <NavbarMarket />

    <div className="flex-grow container-main bg-gray-100">
    <div className="cart-container bg-white rounded-2xl shadow-md flex flex-col h-[70vh]">

      <h2 className="carrinhotext text-2xl font-bold text-center border-b border-gray-200">
        Carrinho de Compras 🛒
      </h2>

      <div className="flex-1 overflow-y-auto space-y-4">
        <ul>
          {cart.map((item, index) => (
            <li
              key={index}
              className="eachProduct flex justify-between items-center bg-gray-100 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-shadow gap-x-6 "
            >
              <img className="w-16 h-16 rounded-lg object-cover object-center" src={item.image}></img>
              <span className="text-lg font-semibold text-gray-900 flex-1">{item.name}</span>
              <span className="text-lg font-semibold text-green-700 whitespace-nowrap">
                R$ {item.price.toFixed(2)}
              </span>
              <button
                onClick={() => {
                  removeFromCart(index);
                  toast.error(`${cart[index].name} removido do carrinho! 🗑️`, {
                    duration: 2000,
                  });
                }}
                className="button bg-red-500 hover:bg-red-600 text-white rounded-xl transition active:scale-95"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-300">
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold text-gray-800">Total:</span>
          <span className="text-xl font-bold text-green-700">
            R$ {cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
          </span>
        </div>

        <div className="buttons-div flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              clearCart()
              toast.error(`Todos itens do carrinho removidos! 🗑️`, {
                duration: 2000,
              });}}
            className="button bg-red-700 hover:bg-red-600 text-white rounded-xl font-semibold transition w-full sm:w-auto"
          >
            Limpar Carrinho
          </button>
          <button
            onClick={() => navigate("/")}
            className="button bg-gray-800 hover:bg-gray-600 text-white rounded-xl font-semibold transition w-full sm:w-auto"
          >
            Voltar para a Loja
          </button>
          <button
            className="button bg-green-700 hover:bg-green-600 text-white rounded-xl font-semibold transition w-full sm:w-auto"
            onClick={() => setModalVisible(true)}
          >
            Finalizar Compra
          </button>
          <PaymentModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              total={cart.length > 0 ? cart.reduce((acc, item) => acc + item.price, 0) : 0}
          />
        </div>
      </div>
    </div>
    
  </div>
</div>
  );
};

export default Cart;
