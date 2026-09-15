import { useState } from "react";
import "./Auth.css";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  const data = new URLSearchParams();

  data.append("username", form.username);
  data.append("password", form.password);
  data.append("grant_type", "password");
  data.append("client_id","6wWJKQrnfPM8Ij2AokEL5R9vGGAnruGGXadEE4xB");
  data.append("client_secret","2bSkdnNZLOiz4n5nsmqW76klXrUHV23rExjU6dZmAuMVHEu1S6DLZW1xHWBQfA5CkfJvSNuRtG71TSIwI1ZsPhT3N8bUjT7IWQQb12WQe7jtwp1WCYHcQFwYAwauzwOs");

  try {
    const response = await api.post("o/token/", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const { access_token, refresh_token } = response.data;

    const userResponse = await api.get("users/me/", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = userResponse.data;
    login(user, access_token);

    if (refresh_token) {
      localStorage.setItem("refresh_token", refresh_token);
    }
    if (user.role === "ADMIN" || user.role === "STAFF") {
      navigate("/management/home");
    } else {
      navigate("/");
    }

  } catch (error) {
    console.error(error);

    if (error.response?.data) {
      setError(
        error.response.data.error_description ||
          error.response.data.detail ||
          "Tên đăng nhập hoặc mật khẩu không đúng."
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
                Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
            </p>

            {error && <div className="ah-error">{error}</div>}

            <div className="ah-field">
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={form.username}
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
                  onClick={() => setShowPw((prev) => !prev)}
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