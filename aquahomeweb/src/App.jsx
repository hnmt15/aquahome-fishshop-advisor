import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";

import HomePage from "./pages/Customer/Home.jsx";
import Products from "./pages/Customer/Product.jsx";
import ProductDetail from "./pages/Customer/ProductDetail.jsx";
import Cart from "./pages/Customer/Cart.jsx";
import Checkout from "./pages/Customer/Checkout.jsx";
import Orders from "./pages/Customer/Orders.jsx";
import OrderDetail from "./pages/Customer/OrderDetail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />

        {/* Customer */}
        <Route path="/" element={<HomePage />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;