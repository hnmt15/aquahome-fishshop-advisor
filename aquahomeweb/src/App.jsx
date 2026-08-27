import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import RegisterPage from './pages/Auth/Register.jsx'
import Login from './pages/Auth/Login.jsx'
import HomePage from './pages/Customer/Home.jsx'
import Products from "./pages/Customer/Product.jsx";
import ProductDetail from "./pages/Customer/ProductDetail.jsx";
import Cart from "./pages/Customer/Cart";
import Checkout from "./pages/Customer/Checkout";
import Orders from "./pages/Customer/Orders";
import OrderDetail from "./pages/Customer/OrderDetail";

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/" element={<Products />} />
            <Route
              path="/products/:id"
              element={<ProductDetail />}
            />
            </Routes>
            <Route path="/cart" element={<Cart />} />

            <Route path="/checkout" element={<Checkout />} />

            <Route path="/orders" element={<Orders />} />

            <Route
              path="/orders/:id"
              element={<OrderDetail />}
            />
    </BrowserRouter>
  )
}

export default App
