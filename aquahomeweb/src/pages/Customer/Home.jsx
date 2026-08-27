import React from "react";
import "./Home.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function HomePage() {
  const categories = [
    {
      name: "Cá cảnh",
      icon: "🐟",
      description: "Các loài cá cảnh",
    },
    {
      name: "Bể cá",
      icon: "🏠",
      description: "Bể và hồ cá",
    },
    {
      name: "Phụ kiện",
      icon: "💧",
      description: "Thiết bị thủy sinh",
    },
    {
      name: "Thức ăn",
      icon: "🪱",
      description: "Thức ăn cho cá",
    },
  ];

  const products = [
    {
      name: "Cá Betta",
      price: "50.000đ",
      image: "/images/betta.jpg",
    },
    {
      name: "Cá Guppy",
      price: "30.000đ",
      image: "/images/guppy.jpg",
    },
    {
      name: "Cá Neon",
      price: "20.000đ",
      image: "/images/neon.jpg",
    },
    {
      name: "Cá Molly",
      price: "25.000đ",
      image: "/images/molly.jpg",
    },
  ];

  return (
    <div className="home">

      <Header />


      {/* HERO */}
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
            <button className="btn-primary">
              Khám phá sản phẩm
            </button>

            <button className="btn-outline">
              Tư vấn cho tôi
            </button>
          </div>

        </div>

      </section>


      {/* CATEGORY */}
      <section className="section">

        <div className="section-title">
          <p>KHÁM PHÁ</p>
          <h2>Danh mục sản phẩm</h2>
        </div>

        <div className="categories">

          {categories.map((category) => (
            <div className="category-card" key={category.name}>

              <div className="category-icon">
                {category.icon}
              </div>

              <h3>{category.name}</h3>

              <p>{category.description}</p>

            </div>
          ))}

        </div>

      </section>


      {/* FEATURED PRODUCTS */}
      <section className="section products-section">

        <div className="section-title">
          <p>SẢN PHẨM</p>
          <h2>Sản phẩm nổi bật</h2>
        </div>

        <div className="products">

          {products.map((product) => (
            <div className="product-card" key={product.name}>

              <div className="product-image">
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="product-info">

                <h3>{product.name}</h3>

                <p className="price">
                  {product.price}
                </p>

                <button>
                  Xem sản phẩm
                </button>

              </div>

            </div>
          ))}

        </div>

      </section>


      {/* CONSULTATION */}
      <section className="consultation">

        <div className="consultation-content">

          <p>KHÔNG BIẾT CHỌN CÁ?</p>

          <h2>
            Hãy để AquaHome
            <br />
            tư vấn cho bạn.
          </h2>

          <p className="consultation-description">
            Nhập thông tin về bể cá của bạn và nhận
            gợi ý những loài cá phù hợp.
          </p>

          <button className="btn-consultation">
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