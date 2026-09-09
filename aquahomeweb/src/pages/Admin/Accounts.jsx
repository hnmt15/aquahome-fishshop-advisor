import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./Accounts.css";
import Header from "../../components/Header";


export default function Accounts() {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
  });

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("users/");
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setStaffs(data.filter((user) => user.role === "STAFF"));
    } catch (err) {
      console.error(err);
      setError("Không thể tải danh sách nhân viên.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      phone: "",
    });
  };

  const openCreateModal = () => {
    setEditingStaff(null);
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (staff) => {
    setEditingStaff(staff);

    setForm({
      username: staff.username || "",
      email: staff.email || "",
      password: "",
      first_name: staff.first_name || "",
      last_name: staff.last_name || "",
      phone: staff.phone || "",
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingStaff(null);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      if (editingStaff) {
        // AdminUpdateSerializer
        const data = {
          username: form.username,
          email: form.email,
          phone: form.phone,
          role: "STAFF",
          first_name: form.first_name,
          last_name: form.last_name,
          is_active: editingStaff.is_active,
        };
        await api.patch(`users/${editingStaff.id}/`, data);
      } else {
        // StaffCreateSerializer
        await api.post("users/create-staff/", {
          username: form.username,
          email: form.email,
          password: form.password,
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.phone,
        });
      }

      closeModal();
      fetchStaffs();
    } catch (err) {
      console.error(err);

      const data = err.response?.data;

      if (data) {
        const message =
          data.detail ||
          Object.values(data).flat().join(" ") ||
          "Có lỗi xảy ra.";

        setError(message);
      } else {
        setError("Không thể kết nối đến server.");
      }
    }
  };

  const handleToggleActive = async (staff) => {
    const action = staff.is_active ? "khóa" : "mở khóa";

    const confirmed = window.confirm(
      `Bạn có chắc muốn ${action} tài khoản "${staff.username}"?`
    );

    if (!confirmed) return;

    try {
      await api.patch(`users/${staff.id}/`, {
        role: "STAFF",
        is_active: !staff.is_active,
      });

      fetchStaffs();
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.detail || `Không thể ${action} tài khoản.`;

      setError(message);
    }
  };

  const handleDelete = async (staff) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa nhân viên "${staff.username}"?\n\nThao tác này không thể hoàn tác.`
    );

    if (!confirmed) return;

    try {
      await api.delete(`users/${staff.id}/`);
      fetchStaffs();
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.detail || "Không thể xóa tài khoản.";

      setError(message);
    }
  };

  const filteredStaffs = staffs.filter((staff) => {
    const keyword = search.toLowerCase();

    return (
      staff.username?.toLowerCase().includes(keyword) ||
      staff.email?.toLowerCase().includes(keyword) ||
      staff.phone?.toLowerCase().includes(keyword) ||
      staff.full_name?.toLowerCase().includes(keyword)
    );
  });

  return (
   <>
    <Header />

    <div className="accounts-page">

      <div className="accounts-header">
        <div>
          <h1>Quản lý nhân viên</h1>
          <p>Quản lý tài khoản nhân viên của AquaHome</p>
        </div>

        <button className="add-staff-btn" onClick={openCreateModal}>
          + Thêm nhân viên
        </button>
      </div>

      {error && (
        <div className="accounts-error">
          {error}
          <button onClick={() => setError("")}>×</button>
        </div>
      )}

      <div className="accounts-toolbar">
        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Tìm theo tên, email, số điện thoại..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="staff-count">
          {filteredStaffs.length} nhân viên
        </div>
      </div>

      <div className="accounts-card">
        {loading ? (
          <div className="accounts-loading">Đang tải dữ liệu...</div>
        ) : filteredStaffs.length === 0 ? (
          <div className="accounts-empty">
            <div className="empty-icon">👤</div>
            <h3>Không có nhân viên</h3>
            <p>Chưa tìm thấy tài khoản nhân viên nào.</p>
          </div>
        ) : (
          <div className="accounts-table-wrapper">
            <table className="accounts-table">
              <thead>
                <tr>
                  <th>Nhân viên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {filteredStaffs.map((staff) => (
                  <tr key={staff.id || staff.username}>
                    <td>
                      <div className="staff-info">
                        <div className="staff-avatar">
                          {staff.avatar ? (
                            <img
                              src={staff.avatar}
                              alt={staff.username}
                            />
                          ) : (
                            staff.username?.charAt(0).toUpperCase()
                          )}
                        </div>

                        <div>
                          <strong>
                            {staff.full_name || staff.username}
                          </strong>
                          <span>@{staff.username}</span>
                        </div>
                      </div>
                    </td>

                    <td>{staff.email || "—"}</td>

                    <td>{staff.phone || "—"}</td>

                    <td>
                      <span className="role-badge">STAFF</span>
                    </td>

                    <td>
                      <span
                        className={
                          staff.is_active
                            ? "status-badge active"
                            : "status-badge inactive"
                        }
                      >
                        {staff.is_active ? "Đang hoạt động" : "Đã khóa"}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => openEditModal(staff)}
                        >
                          Sửa
                        </button>

                        <button
                          className={
                            staff.is_active
                              ? "lock-btn"
                              : "unlock-btn"
                          }
                          onClick={() => handleToggleActive(staff)}
                        >
                          {staff.is_active ? "Khóa" : "Mở khóa"}
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(staff)}
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
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="staff-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>
                  {editingStaff
                    ? "Chỉnh sửa nhân viên"
                    : "Thêm nhân viên"}
                </h2>

                <p>
                  {editingStaff
                    ? "Cập nhật thông tin tài khoản"
                    : "Tạo tài khoản nhân viên mới"}
                </p>
              </div>

              <button className="close-btn" onClick={closeModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Tên đăng nhập</label>
                  <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Nhập tên đăng nhập"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Họ</label>
                  <input
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="Nhập họ"
                    disabled={!!editingStaff}
                  />
                </div>

                <div className="form-group">
                  <label>Tên</label>
                  <input
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="Nhập tên"
                    disabled={!!editingStaff}
                  />
                </div>

                <div className="form-group full">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    required
                  />
                </div>

                {!editingStaff && (
                  <div className="form-group full">
                    <label>Mật khẩu</label>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Hủy
                </button>

                <button type="submit" className="save-btn">
                  {editingStaff ? "Lưu thay đổi" : "Tạo nhân viên"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}