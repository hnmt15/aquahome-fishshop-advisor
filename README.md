# aquahome-fishshop-advisor — Website bán cá cảnh tích hợp hệ thống tư vấn thông minh

> Website thương mại điện tử bán cá cảnh, bể cá, phụ kiện và cây thủy sinh, tích hợp 
> **hệ thống tư vấn dựa trên luật (rule-based advisory system)** giúp khách hàng chọn loài cá
> phù hợp với điều kiện bể và sở thích cá nhân.

## Triển khai tính năng mới so với các shop cá cảnh thông thường

Các trang bán cá cảnh hiện tại và các công cụ tư vấn tương thích (như AqAdvisor)
tồn tại tách rời nhau - khách phải tra cứu ở một nơi rồi quay lại mua hàng ở nơi khác.
AquaHome tích hợp thẳng bộ máy tư vấn vào luồng mua sắm: khách nhập điều kiện bể
(nếu có sẵn bể) và sở thích, hệ thống lọc qua các bước suy luận và trả về loài cá 
phù hợp ngay trong cùng một trang.

## Các tính năng chính

- Đăng ký / Đăng nhập
- Xem/tìm sản phẩm theo danh mục
- Mua hàng / Quản lý đơn hàng
- Tư vấn cá cảnh theo yêu cầu ở thích
- Trang quản trị cho Staff/Admin

## Kiến trúc & công nghệ

| Thành phần | Công nghệ |
|---|---|
| Backend | Django + Django REST Framework |
| Frontend | React |
| Cơ sở dữ liệu | [MySQL — điền đúng version bạn dùng] |
| Hệ thống tư vấn | Rule-based / forward-chaining (không dùng AI/ML) |


## Cấu trúc thư mục

```
aquahome-fishshop-advisor/
├── aquahome/                      # Django project
│   ├── aquahomeapp/                 # Dữ liệu lõi: Species, Feature,
│   │                                 # SpeciesFeature, Product, Order...
│   ├── advisory/                    # Hệ thống tư vấn (module độc lập)
│   │   ├── rules/
│   │   │   ├── filter1.py             # Bước 1 — lọc môi trường
│   │   │   ├── filter2.py             # Bước 2 — lọc tương thích
│   │   │   └── scoring.py             # Bước 3 — Weighted Gower Similarity
│   │   ├── engine.py                 # Điều phối 4 bước suy luận
│   │   ├── serializers.py
│   │   ├── views.py                  # POST /api/advisory/recommend
│   │   └── tests.py
│   └── crawl_scripts/                # Script cào dữ liệu
├── aquahomeweb/                    # React frontend
│   ├── src/pages/auth/                # LoginPage, RegisterPage
│   ├── src/pages/home/                # HomePage
│   └── src/styles/
└── README.md
```

## Cài đặt

### Yêu cầu môi trường

- Python [3.14.2]
- React [19.2.8] (build trên Vite 8.2.1)
- MySQL Workbench 8.0 CE

### Backend

```bash
cd aquahome
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Cấu hình kết nối database trong aquahome/settings.py
python manage.py migrate

python manage.py runserver
```

Server chạy tại `http://127.0.0.1:8000`.

### Frontend

```bash
cd aquahomeweb
npm install
npm run dev
```

Frontend chạy tại `http://localhost:5173`.


## Cơ sở dữ liệu mẫu

File dump đầy đủ gồm **schema và dữ liệu mẫu** được cung cấp tại:

```text
db/aquahome_dump.sql
```
Dữ liệu mẫu bao gồm:
* 13 loài cá cảnh nước ngọt
* 12 Feature
* Dữ liệu SpeciesFeature và quan hệ tương thích
* Dữ liệu sản phẩm mô phỏng
* Tài khoản người dùng mẫu gồm ADMIN/STAFF/CUSTOMER

### Import database

Tạo database MySQL trước:

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS aquahome_db;"
```

Sau đó import file dump:

```bash
mysql -u root -p aquahome_db < database/aquahome_dump.sql
```

Sau khi import thành công, chạy:

```bash
python manage.py migrate
```

Lệnh `migrate` được sử dụng để Django đồng bộ trạng thái migration với cơ sở dữ liệu đã import.

### Tài khoản mẫu

Sau khi import database, có thể sử dụng tài khoản ADMIN mẫu để đăng nhập và kiểm tra các chức năng quản trị của hệ thống.

```text
Username: [admin]
Password: [123]
```

Có thể sử dụng các tài khoản STAFF và CUSTOMER mẫu trong database để kiểm tra các chức năng tương ứng.

### Cập nhật database dump

Nếu có thay đổi dữ liệu mẫu và muốn xuất lại file dump:

```bash
mysqldump -u root -p aquahome_db > database/aquahome_dump.sql
```

Sau đó commit file dump mới cùng với mã nguồn nếu cần chia sẻ phiên bản dữ liệu cập nhật.

### Nguồn dữ liệu

Dữ liệu thông tin loài cá/ Thuộc tính loài được tham khảo và thu thập từ nhiều nguồn khoa học/online phục vụ mục đích học thuật và phi thương mại.


## API — Hệ thống tư vấn

### Endpoint

```text
POST /api/advisory/recommend
```

Hệ thống tư vấn thực hiện các bước chính:

1. **Lọc điều kiện môi trường** dựa trên kích thước bể, nhiệt độ, pH và điều kiện trồng cây.
2. **Kiểm tra khả năng tương thích** với các loài cá khách hàng đang nuôi.
3. **Tính độ tương đồng sở thích** bằng Weighted Gower Similarity.
4. **Xếp hạng và trả về các loài cá phù hợp nhất** cùng sản phẩm tương ứng đang có trong hệ thống.

---

## Kiểm thử

Hệ thống sử dụng Django Test Framework để kiểm thử module tư vấn.

Chạy toàn bộ test:

```bash
python manage.py test advisory
```

Các test bao gồm:

* Unit test cho luật lọc điều kiện môi trường (`filter1`)
* Unit test cho luật kiểm tra tương thích (`filter2`)
* Unit test cho thuật toán Weighted Gower Similarity (`scoring`)
* Integration test cho quy trình tư vấn thông qua API `/api/advisory/recommend`

Để kiểm tra coverage, mở:

```text
htmlcov/index.html
```

---

## Tác giả

* **Sinh viên thực hiện:** [Hà Nguyễn Minh Thư]
* **MSSV:** [2351050175]
* **Giảng viên hướng dẫn:** [ThS. Nguyễn Văn Bảy]
* **Trường:** [Đại học Mở TP.HCM]

---
