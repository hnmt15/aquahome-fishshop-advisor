import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Customer.css";
import api from "../../api/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  const speciesId = searchParams.get("species");
  const categoryId = searchParams.get("category");

  const navigate = useNavigate();

  // Lấy sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const params = {};

        if (speciesId) {
          params.species = speciesId;
        }

        if (categoryId) {
          params.category = categoryId;
        }

        const response = await api.get("product/", {
          params,
        });

        console.log("PRODUCT RESPONSE:", response);
        console.log("PRODUCT DATA:", response.data);

        const data = response.data;

        setProducts(
          Array.isArray(data)
            ? data
            : data.results || []
        );
      } catch (err) {
        console.error("STATUS:", err.response?.status);
        console.error("DATA:", err.response?.data);
        console.error("Lỗi lấy sản phẩm:", err);

        setError("Không thể lấy danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [speciesId, categoryId]);

  // Lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("category/");
        const data = response.data;

        setCategories(
          Array.isArray(data)
            ? data
            : data.results || []
        );
      } catch (err) {
        console.error("Lỗi lấy category:", err);
      }
    };

    fetchCategories();
  }, []);

  // Chỉ tìm kiếm theo tên ở frontend
  // Category đã được backend xử lý
  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Đổi category thông qua URL
  const handleCategoryChange = (e) => {
    const value = e.target.value;

    if (value) {
      navigate(`/products?category=${value}`);
    } else {
      navigate("/products");
    }
  };

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
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={categoryId || ""}
            onChange={handleCategoryChange}
          >
            <option value="">
              Tất cả danh mục
            </option>

            {categories.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>

        </section>

        {/* Loading */}
        {loading && (
          <div className="products-message">
            Đang tải sản phẩm...
          </div>
        )}

        {/* Error */}
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

                {/* Image */}
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

                {/* Information */}
                <div className="product-info">

                  <h3>
                    {product.name}
                  </h3>

                  <div className="product-bottom">

                    <span className="product-price">
                      {Number(
                        product.price
                      ).toLocaleString("vi-VN")}đ
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