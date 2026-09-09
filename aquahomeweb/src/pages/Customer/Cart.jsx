import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Customer.css";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (id, quantity) => {
      if (quantity < 1) return;

      const newCart = cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(quantity, item.stock),
            }
          : item
      );

      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    };

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="customer-page">

      <Header />

      <main className="cart-page">

        <h1>Giỏ hàng</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Giỏ hàng đang trống</h2>

            <p>
              Hãy thêm sản phẩm vào giỏ hàng để tiếp tục.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="continue-button"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (

          <div className="cart-layout">
            <section className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-image">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <span>Không có ảnh</span>
                    )}

                  </div>

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p> {Number(item.price).toLocaleString("vi-VN")}đ
                    </p>
                    <div className="cart-item-bottom">
                        <div className="quantity-control">
                          <button
                            type="button"
                            onClick={() =>
                              updateCart(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            onClick={() =>
                              updateCart(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.stock}
                          >
                            +
                          </button>
                        </div>


                      <button
                        className="remove-button"
                        onClick={() => removeItem(item.id)}
                      >
                        Xóa
                      </button>

                    </div>

                  </div>


                  <strong className="cart-item-total">
                    {(
                      Number(item.price) * item.quantity
                    ).toLocaleString("vi-VN")}đ
                  </strong>

                </div>

              ))}

            </section>


            {/* Tổng tiền */}

            <aside className="cart-summary">

              <h2>Tóm tắt đơn hàng</h2>

              <div className="summary-row">
                <span>Tạm tính</span>

                <strong>
                  {total.toLocaleString("vi-VN")}đ
                </strong>
              </div>

              <div className="summary-row">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>

              <div className="summary-line"></div>

              <div className="summary-total">
                <span>Tổng cộng</span>

                <strong>
                  {total.toLocaleString("vi-VN")}đ
                </strong>
              </div>

              <button
                className="checkout-button"
                onClick={() => navigate("/checkout")}
              >
                Tiến hành đặt hàng
              </button>

            </aside>

          </div>

        )}

      </main>

      <Footer />

    </div>
  );
}