import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./Management.css";
import Header from "../../components/Header";

const emptyForm = {
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    image: null,
};

export default function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("product/");

            const data = response.data;
            setProducts(Array.isArray(data) ? data : data.results || []);
        } catch (err) {
            console.error(err);
            setError("Không thể tải danh sách sản phẩm.");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await api.get("category/");

            const data = response.data;
            setCategories(
                Array.isArray(data) ? data : data.results || []
            );
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setForm({
            ...form,
            [name]: files ? files[0] : value,
        });
    };

    const openCreateModal = () => {
        setEditingProduct(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    const openEditModal = async (product) => {
    try {
        const response = await api.get(`product/${product.id}/`);

        const detail = response.data;

        console.log("PRODUCT LIST:", product);
        console.log("PRODUCT DETAIL:", detail);
        console.log("DESCRIPTION:", detail.description);

        setEditingProduct(detail);

        setForm({
            name: detail.name ?? "",
            category:
                typeof detail.category === "object"
                    ? detail.category?.id ?? ""
                    : detail.category ?? "",
            price: detail.price ?? "",
            quantity: detail.quantity ?? "",
            description: detail.description ?? "",
            image: null,
        });

        setShowModal(true);
    } catch (err) {
        console.error("Lỗi lấy chi tiết product:", err);
        alert("Không thể tải thông tin chi tiết sản phẩm.");
    }
};

    const closeModal = () => {
        if (saving) return;

        setShowModal(false);
        setEditingProduct(null);
        setForm(emptyForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim()) {
            alert("Vui lòng nhập tên sản phẩm.");
            return;
        }

        if (!form.category) {
            alert("Vui lòng chọn danh mục.");
            return;
        }

        if (form.price === "") {
            alert("Vui lòng nhập giá sản phẩm.");
            return;
        }

        try {
            setSaving(true);

            const data = new FormData();

            data.append("name", form.name.trim());
            data.append("category", form.category);
            data.append("price", form.price);
            data.append("quantity", form.quantity || 0);
            data.append("description", form.description.trim());

            if (form.image) {
                data.append("image", form.image);
            }

            if (editingProduct) {
                await api.patch(
                    `product/${editingProduct.id}/`,
                    data,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            } else {
                await api.post("product/", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            closeModal();
            await fetchProducts();
        } catch (err) {
            console.error(err);

            const responseData = err.response?.data;

            const message =
                responseData?.detail ||
                responseData?.name?.[0] ||
                responseData?.price?.[0] ||
                responseData?.category?.[0] ||
                "Không thể lưu sản phẩm.";

            alert(message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (product) => {
        const confirmed = window.confirm(
            `Bạn có chắc muốn xóa sản phẩm "${product.name}" không?`
        );

        if (!confirmed) return;

        try {
            await api.delete(`product/${product.id}/`);
            await fetchProducts();
        } catch (err) {
            console.error(err);

            alert(
                err.response?.data?.detail ||
                "Không thể xóa sản phẩm."
            );
        }
    };

    const getCategoryName = (product) => {
        if (typeof product.category === "object") {
            return product.category?.name || "—";
        }

        const category = categories.find(
            (item) => String(item.id) === String(product.category)
        );

        return category?.name || "—";
    };

    const getImageUrl = (product) => {
        if (!product.image) return null;

        if (typeof product.image === "string") {
            return product.image;
        }

        return product.image?.url || null;
    };

    const filteredProducts = products.filter((product) => {
        const keyword = search.toLowerCase();

        const matchesSearch =
            product.name?.toLowerCase().includes(keyword) ||
            product.description?.toLowerCase().includes(keyword);

        const productCategory =
            typeof product.category === "object"
                ? product.category?.id
                : product.category;

        const matchesCategory =
            !categoryFilter ||
            String(productCategory) === String(categoryFilter);

        return matchesSearch && matchesCategory;
    });

    const formatPrice = (price) => {
        if (price === null || price === undefined || price === "") {
            return "—";
        }

        return Number(price).toLocaleString("vi-VN") + " ₫";
    };

    return (
        <div className="management-page">
            import Header from "../../components/Header";
            <div className="management-header">
                <div>
                    <h1>Quản lý sản phẩm</h1>
                    <p>Quản lý các sản phẩm của AquaHome</p>
                </div>

                <button
                    className="primary-btn"
                    onClick={openCreateModal}
                >
                    + Thêm sản phẩm
                </button>
            </div>

            <div className="management-toolbar">
                <div className="search-box">
                    <span>⌕</span>

                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select
                    className="filter-select"
                    value={categoryFilter}
                    onChange={(e) =>
                        setCategoryFilter(e.target.value)
                    }
                >
                    <option value="">Tất cả danh mục</option>

                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="management-card">
                {loading ? (
                    <div className="empty-state">
                        Đang tải dữ liệu...
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="empty-state">
                        Không tìm thấy sản phẩm nào.
                    </div>
                ) : (
                    <div className="table-wrapper">
                        <table className="management-table product-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Sản phẩm</th>
                                    <th>Danh mục</th>
                                    <th>Giá</th>
                                    <th>Tồn kho</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredProducts.map((product) => {
                                    const imageUrl =
                                        getImageUrl(product);

                                    return (
                                        <tr key={product.id}>
                                            <td className="id-cell">
                                                #{product.id}
                                            </td>

                                            <td>
                                                <div className="product-info">
                                                    <div className="management-product-image">
                                                        {imageUrl ? (
                                                            <img
                                                                src={imageUrl}
                                                                alt={product.name}
                                                            />
                                                        ) : (
                                                            <span>
                                                                🐟
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className="item-name">
                                                            {product.name}
                                                        </div>

                                                        {product.description && (
                                                            <div className="product-description">
                                                                {product.description.length >
                                                                60
                                                                    ? product.description.slice(
                                                                        0,
                                                                        60
                                                                    ) + "..."
                                                                    : product.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <span className="category-badge">
                                                    {getCategoryName(
                                                        product
                                                    )}
                                                </span>
                                            </td>

                                            <td className="price-cell">
                                                {formatPrice(
                                                    product.price
                                                )}
                                            </td>

                                            <td>
                                                <span
                                                    className={
                                                        Number(
                                                            product.quantity
                                                        ) <= 0
                                                            ? "stock-badge out"
                                                            : "stock-badge"
                                                    }
                                                >
                                                    {product.quantity ?? 0}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="edit-btn"
                                                        onClick={() =>
                                                            openEditModal(
                                                                product
                                                            )
                                                        }
                                                    >
                                                        Sửa
                                                    </button>

                                                    <button
                                                        className="delete-btn"
                                                        onClick={() =>
                                                            handleDelete(
                                                                product
                                                            )
                                                        }
                                                    >
                                                        Xóa
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <div
                    className="modal-overlay"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            closeModal();
                        }
                    }}
                >
                    <div className="management-modal large">
                        <div className="modal-header">
                            <div>
                                <h2>
                                    {editingProduct
                                        ? "Chỉnh sửa sản phẩm"
                                        : "Thêm sản phẩm"}
                                </h2>

                                <p>
                                    {editingProduct
                                        ? "Cập nhật thông tin sản phẩm"
                                        : "Tạo một sản phẩm mới"}
                                </p>
                            </div>

                            <button
                                className="close-btn"
                                onClick={closeModal}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>
                                        Tên sản phẩm *
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Nhập tên sản phẩm"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>
                                        Danh mục *
                                    </label>

                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Chọn danh mục
                                        </option>

                                        {categories.map(
                                            (category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Giá *</label>

                                    <input
                                        type="number"
                                        name="price"
                                        min="0"
                                        value={form.price}
                                        onChange={handleChange}
                                        placeholder="Nhập giá"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Tồn kho</label>

                                    <input
                                        type="number"
                                        name="stock"
                                        min="0"
                                        value={form.quantity}
                                        onChange={handleChange}
                                        placeholder="Nhập số lượng"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Mô tả</label>

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Nhập mô tả sản phẩm"
                                    rows="5"
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Hình ảnh
                                    {editingProduct &&
                                        " (để trống nếu không muốn thay đổi)"}
                                </label>

                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="file-input"
                                />

                                {form.image && (
                                    <div className="selected-file">
                                        Đã chọn: {form.image.name}
                                    </div>
                                )}
                            </div>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={closeModal}
                                    disabled={saving}
                                >
                                    Hủy
                                </button>

                                <button
                                    type="submit"
                                    className="primary-btn"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Đang lưu..."
                                        : editingProduct
                                            ? "Lưu thay đổi"
                                            : "Thêm sản phẩm"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}