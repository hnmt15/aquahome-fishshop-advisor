import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Customer.css";
import api from "../../api/api";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingInfo, setEditingInfo] = useState(false);
  const [savingInfo, setSavingInfo] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    customer_name: "",
    customer_phone: "",
    customer_address: "",
    notes: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`orders/${id}/`);

        setOrder(response.data);

        setCustomerInfo({
          customer_name: response.data.customer_name || "",
          customer_phone: response.data.customer_phone || "",
          customer_address: response.data.customer_address || "",
          notes: response.data.notes || "",
        });
      } catch (err) {
        console.error("Lỗi lấy chi tiết đơn hàng:", err);
        setError(
          err.response?.data?.detail ||
          "Không tìm thấy đơn hàng."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
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

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;

    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveCustomerInfo = async () => {
    try {
      setSavingInfo(true);

      const response = await api.patch(`orders/${id}/`, {
        customer_name: customerInfo.customer_name,
        customer_phone: customerInfo.customer_phone,
        customer_address: customerInfo.customer_address,
        notes: customerInfo.notes,
      });

      setOrder(response.data);

      setCustomerInfo({
        customer_name: response.data.customer_name || "",
        customer_phone: response.data.customer_phone || "",
        customer_address: response.data.customer_address || "",
        notes: response.data.notes || "",
      });

      setEditingInfo(false);

      alert("Đã cập nhật thông tin nhận hàng.");
    } catch (err) {
      console.error("Lỗi cập nhật thông tin:", err);

      const errorData = err.response?.data;

      alert(
        errorData?.detail ||
        errorData?.customer_name?.[0] ||
        errorData?.customer_phone?.[0] ||
        errorData?.customer_address?.[0] ||
        "Không thể cập nhật thông tin nhận hàng."
      );
    } finally {
      setSavingInfo(false);
    }
  };

  const handleCancelOrder = async () => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn hủy đơn hàng này không?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancelling(true);

      const response = await api.post(`orders/${id}/cancel/`);

      setOrder(response.data);

      alert("Hủy đơn hàng thành công.");
    } catch (err) {
      console.error("Lỗi hủy đơn hàng:", err);

      alert(
        err.response?.data?.detail ||
        err.response?.data?.status?.[0] ||
        "Không thể hủy đơn hàng."
      );
    } finally {
      setCancelling(false);
    }
  };

  const handleCancelEdit = () => {
    setCustomerInfo({
      customer_name: order.customer_name || "",
      customer_phone: order.customer_phone || "",
      customer_address: order.customer_address || "",
      notes: order.notes || "",
    });

    setEditingInfo(false);
  };

  if (loading) {
    return (
      <div className="customer-page">
        <Header />

        <main className="products-message">
          Đang tải đơn hàng...
        </main>

        <Footer />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="customer-page">
        <Header />

        <main className="products-message">
          <h2>{error || "Không tìm thấy đơn hàng"}</h2>

          <button
            className="continue-button"
            onClick={() => navigate("/orders")}
          >
            Quay lại đơn hàng
          </button>
        </main>

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

          <div className="order-title-row">
            <h1>Đơn hàng #{order.id}</h1>

            <span className={`order-status ${order.status}`}>
              {getStatusText(order.status)}
            </span>
          </div>
        </div>

        {/* Thông tin nhận hàng */}
        <section className="order-section">
          <div className="order-section-header">
            <h2>Thông tin nhận hàng</h2>

            {order.status === "PENDING" && !editingInfo && (
              <button
                className="edit-order-button"
                onClick={() => setEditingInfo(true)}
              >
                Chỉnh sửa
              </button>
            )}
          </div>

          {editingInfo ? (
            <div className="customer-info-form">

              <div className="form-group">
                <label>Họ tên</label>
                <input
                  type="text"
                  name="customer_name"
                  value={customerInfo.customer_name}
                  onChange={handleCustomerInfoChange}
                />
              </div>

              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  name="customer_phone"
                  value={customerInfo.customer_phone}
                  onChange={handleCustomerInfoChange}
                />
              </div>

              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  name="customer_address"
                  value={customerInfo.customer_address}
                  onChange={handleCustomerInfoChange}
                />
              </div>

              <div className="form-group">
                <label>Ghi chú</label>
                <textarea
                  name="notes"
                  value={customerInfo.notes}
                  onChange={handleCustomerInfoChange}
                  rows="3"
                />
              </div>

              <div className="customer-info-actions">
                <button
                  className="cancel-edit-button"
                  onClick={handleCancelEdit}
                  disabled={savingInfo}
                >
                  Hủy
                </button>

                <button
                  className="save-info-button"
                  onClick={handleSaveCustomerInfo}
                  disabled={savingInfo}
                >
                  {savingInfo ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>

            </div>
          ) : (
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
          )}
        </section>

        {/* Sản phẩm */}
        <section className="order-section">
          <h2>Sản phẩm</h2>

          {order.items?.map((item) => (
            <div
              className="order-detail-item"
              key={item.id}
            >
              <div className="order-product-info">
                {item.product_image ? (
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                  />
                ) : (
                  <div className="no-image">
                    Không có ảnh
                  </div>
                )}

                <span>{item.product_name}</span>
              </div>

              <span>
                {item.quantity} sản phẩm
              </span>

              <strong>
                {Number(item.price).toLocaleString("vi-VN")}đ
              </strong>
            </div>
          ))}

          <div className="summary-line"></div>

          <div className="summary-total">
            <span>Tổng cộng</span>

            <strong>
              {Number(order.total_amount).toLocaleString("vi-VN")}đ
            </strong>
          </div>
        </section>

        {/* Thao tác đơn hàng */}
        {order.status === "PENDING" && (
          <div className="order-actions">
            <button
              className="cancel-order-button"
              onClick={handleCancelOrder}
              disabled={cancelling}
            >
              {cancelling
                ? "Đang hủy..."
                : "Hủy đơn hàng"}
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

