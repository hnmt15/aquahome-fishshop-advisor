import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Customer.css";

const API_URL = "http://localhost:8000/api";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`${API_URL}/product/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không tìm thấy sản phẩm");
        }

        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);


  const increaseQuantity = () => {
    if (product && quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };


  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  const handleAddToCart = () => {
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
            quantity: item.quantity + quantity,
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
      },
    ];
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(newCart)
  );

  navigate("/cart");
};


  if (loading) {
    return (
      <div className="customer-page">
        <Header />

        <div className="product-detail-message">
          Đang tải sản phẩm...
        </div>

        <Footer />
      </div>
    );
  }


  if (error || !product) {
    return (
      <div className="customer-page">
        <Header />

        <div className="product-detail-message">
          <h2>{error || "Không tìm thấy sản phẩm"}</h2>

          <button
            className="back-button"
            onClick={() => navigate("/products")}
          >
            Quay lại sản phẩm
          </button>
        </div>

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


        {/* Product */}
        <section className="product-detail">

          {/* Image */}
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


          {/* Information */}
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


            {product.description && (
              <div className="detail-description">
                <h3>Mô tả sản phẩm</h3>

                <p>{product.description}</p>
              </div>
            )}


            {product.quantity > 0 && (
              <>

                <div className="quantity-section">

                  <span>Số lượng</span>

                  <div className="quantity-control">

                    <button onClick={decreaseQuantity}>
                      −
                    </button>

                    <span>{quantity}</span>

                    <button onClick={increaseQuantity}>
                      +
                    </button>

                  </div>

                </div>


                <button
                  className="add-cart-button"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </button>

              </>
            )}

          </div>

        </section>


        {/* Extra information */}
        <section className="product-extra">

          <h2>Thông tin sản phẩm</h2>

          <div className="product-info-row">
            <span>Danh mục</span>
            <strong>{product.category || "—"}</strong>
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