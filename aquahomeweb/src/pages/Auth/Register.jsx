import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Auth.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    const data = {
      username: form.username,
      email: form.email,
      phone: form.phone,
      password: form.password,
    };

    try {
      await api.post("users/", data);

      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");

    } catch (err) {
      console.error("Lỗi đăng ký:", err);

      if (err.response?.data) {
        const backendError = err.response.data;
        const firstErrorKey = Object.keys(backendError)[0];

        setError(
          `${firstErrorKey}: ${backendError[firstErrorKey]}`
        );
      } else {
        setError("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!");
      }
    }
  };

  return (
    <div className="ah-register">
      <div className="ah-tank">

        <div className="ah-brand">
          <span className="ah-brand-mark">A</span>
          <span className="ah-brand-name">quaHome</span>
        </div>

        <div className="ah-surface">
          <form
            className="ah-card"
            onSubmit={handleSubmit}
            noValidate
          >
            <h2>Tạo tài khoản</h2>

            <p className="ah-sub">
              Đã có tài khoản?{" "}
              <a href="/login">Đăng nhập</a>
            </p>

            {error && (
              <div className="ah-error">
                {error}
              </div>
            )}

            {/* Username */}
            <div className="ah-field">
              <label htmlFor="username">
                Tên đăng nhập
              </label>

              <input
                id="username"
                name="username"
                type="text"
                placeholder="aquahome123"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="ah-field">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="ban@vidu.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="ah-field">
              <label htmlFor="phone">
                Số điện thoại
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="0901234567"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="ah-field">
              <label htmlFor="password">
                Mật khẩu
              </label>

              <div className="ah-pw-row">
                <input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  placeholder="Tối thiểu 8 ký tự"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />

                <button
                  type="button"
                  className="ah-pw-toggle"
                  onClick={() => setShowPw((s) => !s)}
                >
                  {showPw ? "Ẩn" : "Hiện"}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div className="ah-field">
              <label htmlFor="confirm">
                Xác nhận mật khẩu
              </label>

              <input
                id="confirm"
                name="confirm"
                type={showPw ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                value={form.confirm}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="ah-submit"
            >
              Đăng ký
            </button>

            <p className="ah-footer-note">
              Bằng việc đăng ký, bạn đồng ý với Điều khoản dịch vụ và Chính
              sách bảo mật của AquaHome.
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}