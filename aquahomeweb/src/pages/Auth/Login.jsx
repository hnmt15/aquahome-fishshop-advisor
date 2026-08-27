import React, { useState } from "react";
import "./Auth.css";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    console.log("login payload", form);
  };

  return (
    <div className="ah-login">
      <div className="ah-tank">
        <div className="ah-brand">
          <span className="ah-brand-mark">A</span>
          <span className="ah-brand-name">quaHome</span>
        </div>


      <div className="ah-surface">
        <form className="ah-card" onSubmit={handleSubmit} noValidate>
          <h2>Đăng nhập</h2>

          <p className="ah-sub">
            Chưa có tài khoản? <a href="/register">Đăng ký</a>
          </p>

          {error && <div className="ah-error">{error}</div>}

          <div className="ah-field">
            <label htmlFor="email">Email</label>
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

          <div className="ah-field">
            <label htmlFor="password">Mật khẩu</label>
            <div className="ah-pw-row">
              <input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={form.password}
                onChange={handleChange}
                required
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

          <button type="submit" className="ah-submit">
            Đăng nhập
          </button>


          <p className="ah-footer-note">
            Bằng việc đăng nhập, bạn đồng ý với Điều khoản dịch vụ và Chính
            sách bảo mật của AquaHome.
          </p>
        </form>
      </div>
      </div>
    </div>
  );
}