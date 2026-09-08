import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import api from "../../api/api";

export default function HomePage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("product/");
        const data = response.data;

        setProducts(
          Array.isArray(data) ? data : data.results || []
        );
      } catch (err) {
        console.error("Lỗi lấy sản phẩm:", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("category/");
        const data = response.data;

        setCategories(
          Array.isArray(data) ? data : data.results || []
        );
      } catch (err) {
        console.error("Lỗi lấy category:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home">

      <Header />
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-small">
            AQUAHOME
          </p>
          <h1>
            Chăm cá dễ dàng,
            <br />
            bể đẹp mỗi ngày.
          </h1>

          <p className="hero-description">
            Cá khỏe - Bể đẹp - Sản phẩm phù hợp
            <br />
            cho hồ cá của bạn.
          </p>

          <div className="hero-buttons">

            <button
              className="btn-primary"
              onClick={() => navigate("/products")}>
              Khám phá sản phẩm
            </button>

            <button
              className="btn-outline"
              onClick={() => navigate("/advisory")}>
              Tư vấn cho tôi
            </button>

          </div>
        </div>
      </section>

      <section className="section">

        <div className="section-title">
          <p>KHÁM PHÁ</p>
          <h2>Danh mục sản phẩm</h2>
        </div>

        {loadingCategories ? (
          <div className="home-message">
            Đang tải danh mục...
          </div>
        ) : (
          <div className="categories">
            {categories.map((category) => (
              <div
                className="category-card"
                key={category.id}
                onClick={() =>
                  navigate(`/products?category=${category.id}`)
                }
              >
                <div className="category-icon">

                </div>
                <h3>
                  {category.name}
                </h3>
                <p>
                  Khám phá sản phẩm
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="section products-section">
        <div className="section-title">
          <p>SẢN PHẨM</p>
          <h2>Sản phẩm nổi bật</h2>
        </div>
        {loadingProducts ? (
          <div className="home-message">
            Đang tải sản phẩm...
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="home-message">
            Chưa có sản phẩm.
          </div>
        ) : (

          <div className="products">
            {featuredProducts.map((product) => (
              <div
                className="product-card"
                key={product.id}
                onClick={() =>
                  navigate(`/products/${product.id}`)
                }>
                <div className="product-image">
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
                <div className="product-info">
                  <h3>
                    {product.name}
                  </h3>

                </div>
              </div>

            ))}

          </div>

        )}

        {!loadingProducts && products.length > 4 && (
          <div className="view-all">
            <button
              onClick={() => navigate("/products")} >
              Xem tất cả sản phẩm →
            </button>
          </div>
        )}

      </section>


      <section className="consultation">
        <div className="consultation-content">
          <p>
            KHÔNG BIẾT CHỌN CÁ?
          </p>

          <h2>
            Hãy để AquaHome
            <br />
            tư vấn cho bạn.
          </h2>

          <p className="consultation-description">
            Nhập thông tin về bể cá của bạn và nhận
            gợi ý những loài cá phù hợp.
          </p>
          <button
            className="btn-consultation"
            onClick={() => navigate("/advisory")}>
            Tư vấn ngay
          </button>

        </div>

        <div className="consultation-fish">
          🐠
        </div>

      </section>

      <Footer />

    </div>
  );
}