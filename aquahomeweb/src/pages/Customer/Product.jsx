import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Customer.css";

const API_URL = "http://localhost:8000/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Lấy sản phẩm
  useEffect(() => {
    fetch(`${API_URL}/product/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không thể lấy danh sách sản phẩm");
        }

        return response.json();
      })
      .then((data) => {
        // Nếu sau này API có pagination
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts(data.results || []);
        }

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Lấy category
  useEffect(() => {
    fetch(`${API_URL}/category/`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategories(data.results || []);
        }
      })
      .catch(() => {
        console.log("Không thể lấy category");
      });
  }, []);

  // Filter
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "" ||
      String(product.category) === String(category) ||
      product.category_name === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="customer-page">
      <Header />

      <main className="products-page">

        {/* Heading */}
        <section className="products-heading">
          <h1>Sản phẩm</h1>

          <p>
            Khám phá các sản phẩm dành cho bể cá của bạn
          </p>
        </section>


        {/* Filter */}
        <section className="products-filter">

          <input
            type="text"
            placeholder="Nhập tên sản phẩm cần tìm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Tất cả danh mục</option>

            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

        </section>


        {/* Content */}
        {loading && (
          <div className="products-message">
            Đang tải sản phẩm...
          </div>
        )}

        {error && (
          <div className="products-error">
            {error}
          </div>
        )}


        {!loading && !error && (
          <section className="product-grid">

            {filteredProducts.map((product) => (
              <div
                className="product-card"
                key={product.id}
                onClick={() =>
                  navigate(`/products/${product.id}`)
                }
              >

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

                  <span className="product-category">
                    {product.category_name || "Sản phẩm"}
                  </span>

                  <h3>{product.name}</h3>

                  <div className="product-bottom">

                    <span className="product-price">
                      {Number(product.price).toLocaleString("vi-VN")}đ
                    </span>

                    <span
                      className={
                        product.quantity > 0
                          ? "product-stock"
                          : "product-out"
                      }
                    >
                      {product.quantity > 0
                        ? `Còn ${product.quantity}`
                        : "Hết hàng"}
                    </span>

                  </div>

                </div>

              </div>
            ))}

          </section>
        )}


        {!loading &&
          !error &&
          filteredProducts.length === 0 && (
            <div className="products-message">
              Không tìm thấy sản phẩm phù hợp.
            </div>
          )}

      </main>

      <Footer />
    </div>
  );
}