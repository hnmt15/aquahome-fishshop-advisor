import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Customer.css";
import api from "../../api/api";

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    customer_address: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("Giỏ hàng đang trống.");
      return;
    }

    setLoading(true);
    setError("");

    const data = {
      ...form,

      items: cart.map((item) => ({
        product: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await api.post("orders/", data);
      localStorage.removeItem("cart");
      navigate(`/orders/${response.data.id}`);
    } catch (err) {
      console.error("Lỗi tạo đơn hàng:", err);
      if (err.response?.data) {
        const backendError = err.response.data;
        if (backendError.detail) {
          setError(backendError.detail);
        }
        // Lỗi items / customer_name / phone...
        else {
          const firstErrorKey =
            Object.keys(backendError)[0];

          const firstError =
            backendError[firstErrorKey];

          setError(
            `${firstErrorKey}: ${
              Array.isArray(firstError)
                ? firstError.join(", ")
                : firstError
            }`
          );
        }
      } else {
        setError(
          "Không thể kết nối đến server."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-page">

      <Header />

      <main className="checkout-page">

        <h1>Đặt hàng</h1>

        <div className="checkout-layout">

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            <h2>Thông tin nhận hàng</h2>

            {error && (
              <div className="checkout-error">
                {error}
              </div>
            )}

            <div className="checkout-field">

              <label htmlFor="customer_name">
                Họ và tên
              </label>

              <input
                id="customer_name"
                name="customer_name"
                value={form.customer_name}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                required
              />

            </div>

            <div className="checkout-field">

              <label htmlFor="customer_phone">
                Số điện thoại
              </label>

              <input
                id="customer_phone"
                name="customer_phone"
                value={form.customer_phone}
                onChange={handleChange}
                placeholder="0901234567"
                required
              />

            </div>

            <div className="checkout-field">

              <label htmlFor="customer_address">
                Địa chỉ nhận hàng
              </label>

              <textarea
                id="customer_address"
                name="customer_address"
                value={form.customer_address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ nhận hàng"
                required
              />

            </div>

            <div className="checkout-field">

              <label htmlFor="notes">
                Ghi chú
              </label>

              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Ghi chú cho đơn hàng..."
              />

            </div>

            <button
              type="submit"
              className="checkout-submit"
              disabled={loading}
            >
              {loading
                ? "Đang đặt hàng..."
                : "Xác nhận đặt hàng"}
            </button>

          </form>

          {/* Tóm tắt đơn hàng */}
          <aside className="checkout-summary">

            <h2>Đơn hàng của bạn</h2>

            {cart.map((item) => (

              <div
                className="checkout-item"
                key={item.id}
              >

                <span>
                  {item.name} × {item.quantity}
                </span>

                <strong>
                  {(
                    Number(item.price) *
                    item.quantity
                  ).toLocaleString("vi-VN")}đ
                </strong>

              </div>

            ))}

            <div className="summary-line"></div>

            <div className="summary-total">

              <span>Tổng cộng</span>

              <strong>
                {total.toLocaleString("vi-VN")}đ
              </strong>

            </div>

          </aside>

        </div>

      </main>

      <Footer />

    </div>
  );
}