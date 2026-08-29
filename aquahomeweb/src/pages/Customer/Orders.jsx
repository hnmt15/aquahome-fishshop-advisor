import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Customer.css";
import api from "../../api/api";

export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("orders/");
        const data = response.data;

        setOrders(
          Array.isArray(data) ? data : data.results || []
        );
      } catch (err) {
        console.error("Lỗi lấy đơn hàng:", err);

        if (err.response?.status === 401) {
          setError("Vui lòng đăng nhập để xem đơn hàng.");
        } else {
          setError("Không thể lấy danh sách đơn hàng.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusText = (status) => {
    const statuses = {
      PENDING: "Chờ xử lý",
      PROCESSING: "Đang xử lý",
      DELIVERED: "Đã giao",
      CANCELLED: "Đã hủy",
      REFUNDED: "Đã hoàn tiền",
    };

    return statuses[status] || status;
  };

  return (
    <div className="customer-page">
      <Header />

      <main className="orders-page">
        <h1>Đơn hàng của tôi</h1>

        {loading && (
          <div className="products-message">
            Đang tải đơn hàng...
          </div>
        )}

        {error && !loading && (
          <div className="products-error">
            {error}
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="empty-cart">
            <h2>Chưa có đơn hàng</h2>

            <p>
              Bạn chưa thực hiện đơn hàng nào.
            </p>

            <button
              className="continue-button"
              onClick={() => navigate("/products")}
            >
              Mua sắm ngay
            </button>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <section className="orders-list">
            {orders.map((order) => (
              <div
                className="order-card"
                key={order.id}
                onClick={() =>
                  navigate(`/orders/${order.id}`)
                }
              >
                <div className="order-header">
                  <strong>
                    Đơn hàng #{order.id}
                  </strong>

                  <span
                    className={`order-status ${order.status}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>

                <div className="order-products">
                  {order.items?.map((item) => (
                    <div
                      className="order-item"
                      key={item.id}
                    >
                      <div className="order-product-info">
                          {item.product_image ? (
                            <img
                              src={item.product_image}
                              alt={item.product_name}
                            />
                          ) : (
                            <div className="no-image">Không có ảnh</div>
                          )}

                          <span>{item.product_name}</span>
                        </div>

                      <span>
                        × {item.quantity}
                      </span>

                      <strong>
                        {Number(item.price).toLocaleString(
                          "vi-VN"
                        )}
                        đ
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="order-total">
                  <span>Tổng tiền</span>

                  <strong>
                    {Number(order.total_amount).toLocaleString(
                      "vi-VN"
                    )}
                    đ
                  </strong>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}