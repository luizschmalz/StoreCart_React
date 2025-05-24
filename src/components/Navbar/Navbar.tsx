import { ShoppingCart } from "lucide-react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import {useCart} from "../../hooks/useCart";

const NavbarMarket = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  return (
    <nav className="navbar w-full bg-gray-900 shadow-md ">
      <div className="navbarcontent mx-auto px-8 py-6 flex">
        <h1 className="text-3xl cursor-pointer font-extrabold text-white tracking-wider "
        onClick={() => navigate("/")}>
          RocketStore
        </h1>

        <div className="relative">
          <button className="text-white hover:text-indigo-400 transition-colors cursor-pointer"
          onClick={() => navigate("/carrinho")}>
            <ShoppingCart className="w-7 h-7" />
          </button>

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cart.reduce((acc, item) => acc + item.qtd, 0)}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMarket;