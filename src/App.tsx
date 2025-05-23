
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from './components/Product/Products';
import ProductDetails from './components/ProductDetail/ProductDetail';
import Cart from './components/Cart/Cart';
import { Toaster } from 'sonner';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  )
}

export default App
