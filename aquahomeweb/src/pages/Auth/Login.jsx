import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = new URLSearchParams();

    data.append("username", form.email);
    data.append("password", form.password);
    data.append("grant_type", "password");
    data.append("client_id", "TUdyOoZBo1F4GaiTtCzUlAbWVWd1Rhi8paq2dXSU");
    data.append("client_secret", "4owb63fCSluxcQTNBCgsGKDQ3cDJcK53dslkZxDvNcHMmlj9y9PfN48UcSNwKx2nW0AUd6sb7FNT2Ahxy4FH4nVpOJNjjmiXWaHji04F0HWkC5NrdB7VCfOT5r5Z9Fho");


    try {
      const response = await api.post("o/token/", {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
    });

      const data = response.data;

      localStorage.setItem("access_token", data.access_token);
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }

      navigate("/");

    } catch (error) {
      console.log(error);

      if (error.response?.data) {
        setError(
          error.response.data.error_description ||
          error.response.data.detail ||
          "Email hoặc mật khẩu không đúng."
        );
      } else {
        setError("Không thể kết nối đến server.");
      }
    }
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