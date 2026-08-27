import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Customer.css";

const API_URL = "http://localhost:8000/api";

export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("access_token");

    fetch(`${API_URL}/orders/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {

        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders(data.results || []);
        }

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

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

        {loading ? (
          <div className="products-message">
            Đang tải đơn hàng...
          </div>
        ) : orders.length === 0 ? (

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

        ) : (

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

                  {order.items.map((item) => (

                    <div
                      className="order-item"
                      key={item.id}
                    >

                      <span>
                        Sản phẩm #{item.product}
                      </span>

                      <span>
                        × {item.quantity}
                      </span>

                      <strong>
                        {Number(item.price)
                          .toLocaleString("vi-VN")}đ
                      </strong>

                    </div>

                  ))}

                </div>


                <div className="order-total">

                  <span>Tổng tiền</span>

                  <strong>
                    {Number(order.total_amount)
                      .toLocaleString("vi-VN")}đ
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