import React, { useState } from "react";
import './styles/Register.css'

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Mật khẩu không khớp.");
      return;
    }
    setError("");
    console.log("register payload", form);
  };

  return (
    <div className="ah-register">

      {/* bìa */}
      <div className="ah-tank">
        <div className="ah-brand">
          <span className="ah-brand-mark">A</span>
          <span className="ah-brand-name">quaHome</span>
          <div className="ah-surface">
        <form className="ah-card" onSubmit={handleSubmit} noValidate>
          <h2>Tạo tài khoản</h2>
          <p className="ah-sub">
            Đã có tài khoản? <a href="/login">Đăng nhập</a>
          </p>
          {error && <div className="ah-error">{error}</div>}
          <div className="ah-field">
            <label htmlFor="name">Họ và tên</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nguyễn Văn A"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="ah-field">
            <label htmlFor="confirm">Xác nhận mật khẩu</label>
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

          <button type="submit" className="ah-submit">
            Đăng ký
          </button>

          <div className="ah-divider"></div>

          <p className="ah-footer-note">
            Bằng việc đăng ký, bạn đồng ý với Điều khoản dịch vụ và Chính
            sách bảo mật của AquaHome.
          </p>
           </form>
        </div>
        <div className="ah-tank-copy">
        </div>
      </div>

      {/* nd */}


      </div>
    </div>
  );
}