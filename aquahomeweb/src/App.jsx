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
import Profile from "./pages/Customer/Profile.jsx";
import Advisory from "./pages/Advisory";
import StaffOrders from "./pages/Staff/StaffOrders.jsx";
import StaffOrderDetail from "./pages/Staff/StaffOrderDetail.jsx";

import Accounts from "./pages/Admin/Accounts";
import ManagementHome from "./pages/Management/Home";
import Category from "./pages/Management/Category";
import Product from "./pages/Management/Product";

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
                <ProtectedRoute
                  allowedRoles={["CUSTOMER"]}
                  publicForUnauthenticated={true}
                >
                <HomePage />
                </ProtectedRoute>} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={
                <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                    <Cart />
                </ProtectedRoute>} />
            <Route path="/checkout" element={
                <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                    <Checkout />
                </ProtectedRoute>}  />
            <Route path="/orders" element={
                <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                    <Orders />
                </ProtectedRoute>} />
            <Route path="/orders/:id" element={
                <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                    <OrderDetail />
                </ProtectedRoute>}  />
            <Route path="/profile" element={
                <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                  <Profile />
                </ProtectedRoute> }/>

            <Route path="/advisory" element={<Advisory />} />


            <Route path="/management/home" element={
              <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
                <ManagementHome />
              </ProtectedRoute>} />
            <Route path="/management/orders" element={
                <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
                    <StaffOrders />
                </ProtectedRoute>} />
            <Route path="/management/orders/:id" element={
                <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
                    <StaffOrderDetail />
                </ProtectedRoute>} />
            <Route path="/management/categories" element={
                <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
                <Category />
              </ProtectedRoute>} />
            <Route path="/management/products" element={
                <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
                <Product />
              </ProtectedRoute>} />


            <Route path="/admin/accounts" element={
                <ProtectedRoute allowedRoles={"ADMIN"}>
                    <Accounts />
              </ProtectedRoute>} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;