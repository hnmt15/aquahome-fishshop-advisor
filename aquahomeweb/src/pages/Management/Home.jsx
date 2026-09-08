import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import api from "../../api/api";
import Header from "../../components/Header";


export default function ManagementHome() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Lỗi đọc thông tin user:", error);
      }
    }

    const fetchDashboardData = async () => {
  try {
    const [
      productResponse,
      categoryResponse,
      orderResponse,
    ] = await Promise.all([
      api.get("product/"),
      api.get("category/"),
      api.get("orders/"),
    ]);

    const products = Array.isArray(productResponse.data)
      ? productResponse.data
      : productResponse.data.results || [];

    const categories = Array.isArray(categoryResponse.data)
      ? categoryResponse.data
      : categoryResponse.data.results || [];

    const orders = Array.isArray(orderResponse.data)
      ? orderResponse.data
      : orderResponse.data.results || [];

    setProductCount(products.length);
    setCategoryCount(categories.length);
    setOrderCount(orders.length);

  } catch (error) {
    console.error(
      "Lỗi lấy dữ liệu dashboard:",
      error
    );
  } finally {
    setLoading(false);
  }
};

    fetchDashboardData();
  }, []);

  const isAdmin = user?.role === "ADMIN";

  return (
    <>
      <Header />

      <div className="management-home">

        {/* HEADER DASHBOARD */}
        <div className="dashboard-header">
          <div>
            <p className="dashboard-label">AQUAHOME</p>

            <h1>
              Xin chào, {user?.username || "bạn"}!
            </h1>

            <p className="dashboard-subtitle">
              Chào mừng bạn đến với trang quản lý AquaHome.
            </p>
          </div>

          <div className="role-badge">
            {isAdmin ? "ADMIN" : "STAFF"}
          </div>
        </div>


        {/* THỐNG KÊ */}
        <div className="dashboard-stats">

          <div className="stat-card">
            <div>
              <p>Sản phẩm</p>
              <h2>{loading ? "..." : productCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div>
              <p>Danh mục</p>
              <h2>{loading ? "..." : categoryCount}</h2>
            </div>
          </div>

          <div className="stat-card">
              <div>
                <p>Đơn hàng</p>
                <h2>{loading ? "..." : orderCount}</h2>
              </div>
            </div>

          {isAdmin && (
            <div className="stat-card">
              <div>
                <p>Nhân viên</p>
                <h2>—</h2>
              </div>
            </div>
          )}

        </div>


        {/* QUẢN LÝ NHANH */}
        <section className="quick-section">

          <div className="section-heading">
            <p>QUẢN LÝ</p>
          </div>

          <div className="quick-grid">

            <button
              className="quick-card"
              onClick={() => navigate("/management/products")}
            >
              <div>
                <h3>Quản lý sản phẩm</h3>
                <p>Thêm, sửa và xóa sản phẩm</p>
              </div>

              <span className="arrow">→</span>
            </button>


            <button
              className="quick-card"
              onClick={() => navigate("/management/categories")}
            >
              <div>
                <h3>Quản lý danh mục</h3>
                <p>Quản lý các danh mục sản phẩm</p>
              </div>

              <span className="arrow">→</span>
            </button>


            <button
              className="quick-card"
              onClick={() => navigate("/management/orders")}
            >
              <div>
                <h3>Quản lý đơn hàng</h3>
                <p>Xem và xử lý đơn hàng</p>
              </div>

              <span className="arrow">→</span>
            </button>


            {isAdmin && (
              <button
                className="quick-card"
                onClick={() => navigate("/admin/accounts")}
              >
                <div>
                  <h3>Quản lý nhân viên</h3>
                  <p>Quản lý tài khoản Staff</p>
                </div>

                <span className="arrow">→</span>
              </button>
            )}

          </div>

        </section>

      </div>
    </>
  );
}