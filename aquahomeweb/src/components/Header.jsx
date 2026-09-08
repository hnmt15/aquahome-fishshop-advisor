import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        🐟 AquaHome
      </div>

      <nav>
        <Link to="/">Cửa hàng</Link>
        <Link to="/products">Sản phẩm</Link>
        <Link to="/advisory">Tư vấn</Link>
      </nav>

      <div className="header-right">

          {user?.role === "CUSTOMER" && (
            <div className="search">
              <input placeholder="Nhập sản phẩm cần tìm" />
              <button type="button">🔍</button>
            </div>
          )}

          {user?.role === "CUSTOMER" && (
            <Link to="/cart">🛒</Link>
          )}

          {user ? (
            <>
              <span className="header-username">
                {user.username}
              </span>

              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <Link to="/login">Đăng nhập</Link>
          )}

        </div>
    </header>
  );
}