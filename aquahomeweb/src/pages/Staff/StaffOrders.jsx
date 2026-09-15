import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "./StaffOrders.css";
import Header from "../../components/Header";


const STATUS_CONFIG = {
  PENDING: {
    label: "Chờ xử lý",
    className: "status-pending",
  },
  PROCESSING: {
    label: "Đang xử lý",
    className: "status-processing",
  },
  DELIVERED: {
    label: "Đã giao",
    className: "status-delivered",
  },
  CANCELLED: {
    label: "Đã hủy",
    className: "status-cancelled",
  },
  REFUNDED: {
    label: "Đã hoàn tiền",
    className: "status-refunded",
  },
};

function StaffOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("orders/");

      const data = response.data;
      setOrders(
        Array.isArray(data)
          ? data
          : data.results || []
      );
    } catch (err) {
      console.error(err);
      setError("Không thể tải danh sách đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const keyword = search.toLowerCase().trim();

    const matchesSearch =
      !keyword ||
      String(order.id).includes(keyword) ||
      order.customer?.username
        ?.toLowerCase()
        .includes(keyword) ||
      order.customer?.email
        ?.toLowerCase()
        .includes(keyword);

    const matchesStatus =
      statusFilter === "ALL" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("vi-VN") + " VNĐ";

  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleString("vi-VN");
  };

  return (
      <>
      <Header />
    <div className="staff-orders-page">

      <div className="staff-orders-container">

        <div className="page-header">
          <div>
            <span className="page-label">
              STAFF MANAGEMENT
            </span>

            <h1>Quản lý đơn hàng</h1>

            <p>
              Theo dõi và xử lý các đơn hàng của khách hàng.
            </p>
          </div>

          <button
            className="refresh-button"
            onClick={fetchOrders}
          >
            ↻ Làm mới
          </button>
        </div>


        {/* Statistics */}
        <div className="order-stats">

          <div className="stat-card">
            <span>Tổng đơn hàng</span>
            <strong>{orders.length}</strong>
          </div>

          <div className="stat-card pending">
            <span>Chờ xử lý</span>
            <strong>
              {
                orders.filter(
                  (order) => order.status === "PENDING"
                ).length
              }
            </strong>
          </div>

          <div className="stat-card processing">
            <span>Đang xử lý</span>
            <strong>
              {
                orders.filter(
                  (order) => order.status === "PROCESSING"
                ).length
              }
            </strong>
          </div>

          <div className="stat-card delivered">
            <span>Đã giao</span>
            <strong>
              {
                orders.filter(
                  (order) => order.status === "DELIVERED"
                ).length
              }
            </strong>
          </div>

        </div>


        {/* Filters */}
        <div className="order-toolbar">

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Tìm theo mã đơn, khách hàng..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="ALL">
              Tất cả trạng thái
            </option>

            <option value="PENDING">
              Chờ xử lý
            </option>

            <option value="PROCESSING">
              Đang xử lý
            </option>

            <option value="DELIVERED">
              Đã giao
            </option>

            <option value="CANCELLED">
              Đã hủy
            </option>

            <option value="REFUNDED">
              Đã hoàn tiền
            </option>
          </select>

        </div>


        {/* Error */}
        {error && (
          <div className="orders-error">
            {error}
          </div>
        )}


        {/* Table */}
        <div className="orders-table-wrapper">

          {loading ? (
            <div className="orders-loading">
              Đang tải đơn hàng...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="orders-empty">
              <h3>Không tìm thấy đơn hàng</h3>

              <p>
                Không có đơn hàng nào phù hợp với
                điều kiện tìm kiếm.
              </p>
            </div>
          ) : (
            <table className="orders-table">

              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Sản phẩm</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Ngày đặt</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => {

                  const status =
                    STATUS_CONFIG[order.status] ||
                    {
                      label: order.status,
                      className: "",
                    };

                  return (
                    <tr key={order.id}>

                      <td>
                        <strong>
                          #{order.id}
                        </strong>
                      </td>

                      <td>
                        <div className="customer-cell">
                          <strong>
                            {order.customer?.username ||
                              order.customer?.name ||
                              "Khách hàng"}
                          </strong>

                          {order.customer?.email && (
                            <span>
                              {order.customer.email}
                            </span>
                          )}
                        </div>
                      </td>

                      <td>
                        {order.items?.length || 0} sản phẩm
                      </td>

                      <td>
                        <strong>
                          {formatPrice(order.total_price)}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`order-status ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </td>

                      <td>
                        {formatDate(order.created_at)}
                      </td>

                      <td>
                        <Link
                          to={`/management/orders/${order.id}`}
                          className="view-order-button"
                        >
                          Chi tiết
                        </Link>
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>
          )}

        </div>

      </div>
    </div>
    </>
  );
}

export default StaffOrders;

