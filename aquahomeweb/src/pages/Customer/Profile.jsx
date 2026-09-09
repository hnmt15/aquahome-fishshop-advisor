import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


export default function Profile() {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("users/me/");

        const data = response.data;

        setForm({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          avatar: null,
        });

        setAvatarPreview(data.avatar || "");
      } catch (error) {
        console.error("Lỗi lấy thông tin profile:", error);
        setError("Không thể tải thông tin tài khoản.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      avatar: file,
    }));

    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const data = new FormData();

      data.append("username", form.username);
      data.append("email", form.email);
      data.append("phone", form.phone);

      if (form.avatar) {
        data.append("avatar", form.avatar);
      }

      const response = await api.patch("users/me/", data);

      const updatedUser = response.data;

      // Cập nhật lại AuthContext + localStorage
      const token = localStorage.getItem("access_token");

      login(updatedUser, token);

      setForm((prev) => ({
        ...prev,
        avatar: null,
      }));

      setAvatarPreview(updatedUser.avatar || "");

      setMessage("Cập nhật thông tin thành công.");
    } catch (error) {
      console.error("Lỗi cập nhật profile:", error);

      if (error.response?.data) {
        const data = error.response.data;

        if (typeof data === "object") {
          const firstError = Object.values(data)[0];

          setError(
            Array.isArray(firstError)
              ? firstError[0]
              : firstError || "Không thể cập nhật thông tin."
          );
        } else {
          setError("Không thể cập nhật thông tin.");
        }
      } else {
        setError("Không thể kết nối đến server.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <p>Đang tải thông tin...</p>
      </div>
    );
  }

  return (
  <>
    <Header />

    <div className="profile-page">
      <div className="profile-container">

        <div className="profile-header">
          <div>
            <p className="profile-label">TÀI KHOẢN</p>
            <h1>Thông tin cá nhân</h1>
            <p>
              Quản lý thông tin tài khoản của bạn.
            </p>
          </div>
        </div>

        <div className="profile-content">

          {/* THÔNG TIN */}
          <div className="profile-card">

            <h2>Thông tin tài khoản</h2>

            <form onSubmit={handleSubmit}>

              {/* AVATAR */}
              <div className="avatar-section">
                <div className="avatar-preview">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar"
                    />
                  ) : (
                    <span>
                      {form.username?.charAt(0).toUpperCase() || "U"}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="avatar"
                    className="avatar-button"
                  >
                    Đổi ảnh đại diện
                  </label>

                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    hidden
                  />

                  <p className="avatar-note">
                    Chọn ảnh JPG, PNG hoặc WEBP.
                  </p>
                </div>
              </div>

              {/* USERNAME */}
              <div className="form-group">
                <label>Tên đăng nhập</label>

                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* PHONE */}
              <div className="form-group">
                <label>Số điện thoại</label>

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              {message && (
                <p className="profile-success">
                  {message}
                </p>
              )}

              {error && (
                <p className="profile-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="save-profile-button"
                disabled={saving}
              >
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>

            </form>

          </div>

          {/* ĐƠN HÀNG */}
          <div className="profile-card orders-card">

            <div>
              <h2>Đơn hàng của tôi</h2>

              <p>
                Xem lại toàn bộ lịch sử mua hàng và trạng thái
                các đơn hàng của bạn.
              </p>
            </div>

            <button
              type="button"
              className="orders-button"
              onClick={() => navigate("/orders")}
            >
              Xem đơn hàng
              <span>→</span>
            </button>

          </div>

        </div>

      </div>
            <Footer />

    </div>

  </>
);
}