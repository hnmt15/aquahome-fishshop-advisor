import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Customer.css";

const API_URL = "http://localhost:8000/api";

export default function OrderDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token =
      localStorage.getItem("access_token");

    fetch(`${API_URL}/orders/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {

        if (!response.ok) {
          throw new Error("Không tìm thấy đơn hàng");
        }

        return response.json();
      })
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

  }, [id]);


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


  if (loading) {
    return (
      <div className="customer-page">
        <Header />

        <div className="products-message">
          Đang tải...
        </div>

        <Footer />
      </div>
    );
  }


  if (!order) {
    return (
      <div className="customer-page">

        <Header />

        <div className="products-message">

          <h2>Không tìm thấy đơn hàng</h2>

          <button
            className="continue-button"
            onClick={() => navigate("/orders")}
          >
            Quay lại đơn hàng
          </button>

        </div>

        <Footer />

      </div>
    );
  }


  return (
    <div className="customer-page">

      <Header />

      <main className="order-detail-page">

        <div className="order-detail-title">

          <button
            className="back-link"
            onClick={() => navigate("/orders")}
          >
            ← Đơn hàng của tôi
          </button>

          <h1>
            Đơn hàng #{order.id}
          </h1>

          <span
            className={`order-status ${order.status}`}
          >
            {getStatusText(order.status)}
          </span>

        </div>


        {/* Thông tin nhận hàng */}

        <section className="order-section">

          <h2>Thông tin nhận hàng</h2>

          <div className="customer-info">

            <p>
              <strong>Họ tên:</strong>{" "}
              {order.customer_name}
            </p>

            <p>
              <strong>Số điện thoại:</strong>{" "}
              {order.customer_phone}
            </p>

            <p>
              <strong>Địa chỉ:</strong>{" "}
              {order.customer_address}
            </p>

            {order.notes && (
              <p>
                <strong>Ghi chú:</strong>{" "}
                {order.notes}
              </p>
            )}

          </div>

        </section>


        {/* Sản phẩm */}

        <section className="order-section">

          <h2>Sản phẩm</h2>

          {order.items.map((item) => (

            <div
              className="order-detail-item"
              key={item.id}
            >

              <span>
                Sản phẩm #{item.product}
              </span>

              <span>
                {item.quantity} sản phẩm
              </span>

              <strong>
                {Number(item.price)
                  .toLocaleString("vi-VN")}đ
              </strong>

            </div>

          ))}

          <div className="summary-line"></div>

          <div className="summary-total">

            <span>Tổng cộng</span>

            <strong>
              {Number(order.total_amount)
                .toLocaleString("vi-VN")}đ
            </strong>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
}