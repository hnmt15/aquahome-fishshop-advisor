import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./Management.css";
import Header from "../../components/Header";

const emptyForm = {
    name: "",
    description: "",
};

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("category/");

            const data = response.data;
            setCategories(Array.isArray(data) ? data : data.results || []);
        } catch (err) {
            console.error(err);
            setError("Không thể tải danh sách danh mục.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const openCreateModal = () => {
        setEditingCategory(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    const openEditModal = (category) => {
        setEditingCategory(category);

        setForm({
            name: category.name || "",
            description: category.description || "",
        });

        setShowModal(true);
    };

    const closeModal = () => {
        if (saving) return;

        setShowModal(false);
        setEditingCategory(null);
        setForm(emptyForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim()) {
            alert("Vui lòng nhập tên danh mục.");
            return;
        }

        try {
            setSaving(true);

            const payload = {
                name: form.name.trim(),
                description: form.description.trim(),
            };

            if (editingCategory) {
                await api.patch(
                    `category/${editingCategory.id}/`,
                    payload
                );
            } else {
                await api.post("category/", payload);
            }

            closeModal();
            await fetchCategories();
        } catch (err) {
            console.error(err);

            const message =
                err.response?.data?.detail ||
                err.response?.data?.name?.[0] ||
                "Không thể lưu danh mục.";

            alert(message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (category) => {
        const confirmed = window.confirm(
            `Bạn có chắc muốn xóa danh mục "${category.name}" không?`
        );

        if (!confirmed) return;

        try {
            await api.delete(`category/${category.id}/`);
            await fetchCategories();
        } catch (err) {
            console.error(err);

            const message =
                err.response?.data?.detail ||
                "Không thể xóa danh mục. Có thể danh mục đang được sử dụng.";

            alert(message);
        }
    };

    const filteredCategories = categories.filter((category) => {
        const keyword = search.toLowerCase();

        return (
            category.name?.toLowerCase().includes(keyword) ||
            category.description?.toLowerCase().includes(keyword)
        );
    });

    return (
        <div className="management-page">
            <Header />
            <div className="management-header">
                <div>
                    <h1>Quản lý danh mục</h1>
                    <p>Quản lý các danh mục sản phẩm của AquaHome</p>
                </div>

                <button
                    className="primary-btn"
                    onClick={openCreateModal}
                >
                    + Thêm danh mục
                </button>
            </div>

            <div className="management-toolbar">
                <div className="search-box">
                    <span>⌕</span>
                    <input
                        type="text"
                        placeholder="Tìm kiếm danh mục..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
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
                ) : filteredCategories.length === 0 ? (
                    <div className="empty-state">
                        Không tìm thấy danh mục nào.
                    </div>
                ) : (
                    <div className="table-wrapper">
                        <table className="management-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên danh mục</th>
                                    <th>Mô tả</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredCategories.map((category) => (
                                    <tr key={category.id}>
                                        <td className="id-cell">
                                            #{category.id}
                                        </td>

                                        <td>
                                            <div className="item-name">
                                                {category.name}
                                            </div>
                                        </td>

                                        <td className="description-cell">
                                            {category.description || "—"}
                                        </td>

                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        openEditModal(category)
                                                    }
                                                >
                                                    Sửa
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(category)
                                                    }
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
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
                    <div className="management-modal">
                        <div className="modal-header">
                            <div>
                                <h2>
                                    {editingCategory
                                        ? "Chỉnh sửa danh mục"
                                        : "Thêm danh mục"}
                                </h2>

                                <p>
                                    {editingCategory
                                        ? "Cập nhật thông tin danh mục"
                                        : "Tạo một danh mục sản phẩm mới"}
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
                            <div className="form-group">
                                <label>Tên danh mục *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Nhập tên danh mục"
                                />
                            </div>

                            <div className="form-group">
                                <label>Mô tả</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Nhập mô tả danh mục"
                                    rows="4"
                                />
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
                                        : editingCategory
                                            ? "Lưu thay đổi"
                                            : "Thêm danh mục"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}