import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import api from "../../api/api"
import "./Customer.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartMessage, setCartMessage] = useState("");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lấy chi tiết sản phẩm
  useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`product/${id}/`);
          setProduct(response.data);
        } catch (err) {
          console.error("Lỗi lấy chi tiết sản phẩm:", err);

          if (err.response?.status === 404) {
            setError("Không tìm thấy sản phẩm");
          } else {
            setError("Không thể lấy thông tin sản phẩm.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }, [id]);

  const increaseQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (!user) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
        navigate("/login");
        return;
      }

      if (user.role !== "CUSTOMER") {
        alert("Chỉ khách hàng mới có thể thêm sản phẩm vào giỏ hàng.");
        return;
  }
    const oldCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = oldCart.find(
      (item) => item.id === product.id
    );

    let newCart;

    if (existingItem) {
      newCart = oldCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: Math.min(
              item.quantity + quantity,
              item.stock
            )
            }
          : item
      );
    } else {
      newCart = [
        ...oldCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
          stock: product.quantity,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(newCart)
    );
     setCartMessage("Thêm sản phẩm vào giỏ hàng thành công!");

  setTimeout(() => {
    setCartMessage("");
  }, 2000);
  };

  if (loading) {
    return (
      <div className="customer-page">
        <Header />

        <main className="product-detail-message">
          Đang tải sản phẩm...
        </main>

        <Footer />
      </div>
    );
  }

  // Error
  if (error || !product) {
    return (
      <div className="customer-page">
        <Header />

        <main className="product-detail-message">
          <h2>{error || "Không tìm thấy sản phẩm"}</h2>

          <button
            className="back-button"
            onClick={() => navigate("/products")}
          >
            Quay lại sản phẩm
          </button>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="customer-page">
      <Header />

      <main className="product-detail-page">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate("/")}>
            Trang chủ
          </span>

          <span> / </span>

          <span onClick={() => navigate("/products")}>
            Sản phẩm
          </span>

          <span> / {product.name}</span>
        </div>

        {/* Chi tiết sản phẩm */}
        <section className="product-detail">
          <div className="detail-image">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
              />
            ) : (
              <div className="no-image">
                Không có ảnh
              </div>
            )}
          </div>
          <div className="detail-info">

            <span className="detail-category">
              {product.category || "Sản phẩm"}
            </span>

            <h1>{product.name}</h1>

            <div className="detail-price">
              {Number(product.price).toLocaleString("vi-VN")}đ
            </div>

            <div className="detail-stock">
              {product.quantity > 0 ? (
                <>
                  <span className="stock-dot"></span>
                  Còn {product.quantity} sản phẩm
                </>
              ) : (
                <span className="out-of-stock">
                  Hết hàng
                </span>
              )}
            </div>

            {/* Mô tả */}
            {product.description && (
              <div className="detail-description">
                <h3>Mô tả sản phẩm</h3>
                <p>{product.description}</p>
              </div>
            )}

            {/* Chọn số lượng + thêm giỏ */}
            {product.quantity > 0 && (
              <>
                <div className="quantity-section">
                  <span>Số lượng</span>

                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                    >
                      −
                    </button>

                    <span>{quantity}</span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                {cartMessage && (
                    <div className="cart-success-message">
                      ✓ {cartMessage}
                    </div>
                  )}
                <button
                  type="button"
                  className="add-cart-button"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </button>
              </>
            )}

          </div>
        </section>

        {/* Thông tin thêm */}
        <section className="product-extra">
          <h2>Thông tin sản phẩm</h2>

          <div className="product-info-row">
            <span>Danh mục</span>
            <strong>
              {product.category || "—"}
            </strong>
          </div>

          <div className="product-info-row">
            <span>Tình trạng</span>
            <strong>
              {product.quantity > 0
                ? "Còn hàng"
                : "Hết hàng"}
            </strong>
          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}