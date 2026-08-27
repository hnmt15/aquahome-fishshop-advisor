import React from "react";
import "./Header.css"
export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        🐟 AquaHome
      </div>

      <nav>
        <a href="/">Cá cảnh</a>
        <a href="/tanks">Bể cá</a>
        <a href="/accessories">Phụ kiện cá cảnh</a>
      </nav>

      <div className="header-right">
        <div className="search">
          <input placeholder="Nhập sản phẩm cần tìm" />
          <button>🔍</button>
        </div>

        <a href="/cart">🛒</a>
        <a href="/login">Đăng nhập</a>
      </div>
    </header>
  );
}