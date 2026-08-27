import React from "react";
import "./Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        🐟 AquaHome
      </div>

      <p>
        Giải pháp mua sắm và tư vấn cá cảnh.
      </p>

      <div className="footer-links">
        <a href="/">Về chúng tôi</a>
        <a href="/">Liên hệ</a>
        <a href="/">Điều khoản</a>
        <a href="/">Chính sách bảo mật</a>
      </div>

      <p className="copyright">
        © 2026 AquaHome. All rights reserved.
      </p>
    </footer>
  );
}