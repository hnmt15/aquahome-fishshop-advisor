import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "./StaffOrders.css";

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

function StaffOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`orders/${id}/`);

      setOrder(response.data);
      setStatus(response.data.status);
    } catch (err) {
      console.error(err);
      setError("Không thể tải thông tin đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!order || status === order.status) {
      return;
    }

    try {
      setUpdating(true);
      setError("");

      const response = await api.patch(
        `/orders/${id}/`,
        {
          status,
        }
      );

      setOrder(response.data);
      setStatus(response.data.status);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Không thể cập nhật trạng thái đơn hàng."
      );

      setStatus(order.status);
    } finally {
      setUpdating(false);
    }
  };

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("vi-VN") + " VNĐ";

  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleString("vi-VN");
  };

  if (loading) {
    return (
      <div className="order-detail-page">
        <div className="detail-loading">
          Đang tải thông tin đơn hàng...
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-detail-page">
        <div className="detail-error">
          {error || "Không tìm thấy đơn hàng."}
        </div>
      </div>
    );
  }

  const currentStatus =
    STATUS_CONFIG[order.status] || {
      label: order.status,
      className: "",
    };

  return (
    <div className="order-detail-page">

      <div className="order-detail-container">

        {/* Back */}
        <Link
          to="/staff/orders"
          className="back-link"
        >
          ← Quay lại danh sách đơn hàng
        </Link>


        {/* Header */}
        <div className="detail-header">

          <div>
            <span className="page-label">
              ORDER DETAIL
            </span>

            <h1>
              Đơn hàng #{order.id}
            </h1>

            <p>
              Đặt lúc {formatDate(order.created_at)}
            </p>
          </div>

          <span
            className={`order-status large ${currentStatus.className}`}
          >
            {currentStatus.label}
          </span>

        </div>


        {error && (
          <div className="orders-error">
            {error}
          </div>
        )}


        <div className="detail-layout">

          {/* LEFT */}
          <div className="detail-main">

            {/* Products */}
            <section className="detail-card">

              <div className="card-header">
                <h2>Sản phẩm trong đơn</h2>

                <span>
                  {order.items?.length || 0} sản phẩm
                </span>
              </div>

              <div className="order-items">

                {order.items?.map((item) => (

                  <div
                    className="order-item"
                    key={item.id}
                  >

                    <div className="item-image">
                      {item.product?.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                        />
                      ) : (
                        <span>🐟</span>
                      )}
                    </div>

                    <div className="item-info">

                      <h3>
                        {item.product?.name ||
                          "Sản phẩm"}
                      </h3>

                      <p>
                        Số lượng: {item.quantity}
                      </p>

                    </div>

                    <div className="item-price">

                      <span>
                        {formatPrice(item.unit_price)}
                      </span>

                      <strong>
                        {formatPrice(
                          Number(item.unit_price || 0) *
                            Number(item.quantity || 0)
                        )}
                      </strong>

                    </div>

                  </div>

                ))}

              </div>


              {/* Total */}
              <div className="order-summary">

                <div>
                  <span>Tạm tính</span>
                  <strong>
                    {formatPrice(order.total_price)}
                  </strong>
                </div>

                <div className="total-row">
                  <span>Tổng cộng</span>
                  <strong>
                    {formatPrice(order.total_price)}
                  </strong>
                </div>

              </div>

            </section>

          </div>


          {/* RIGHT */}
          <aside className="detail-sidebar">

            {/* Customer */}
            <section className="detail-card">

              <div className="card-header">
                <h2>Thông tin khách hàng</h2>
              </div>

              <div className="customer-detail">

                <strong>
                  {order.customer?.username ||
                    order.customer?.name ||
                    "Khách hàng"}
                </strong>

                {order.customer?.email && (
                  <p>
                    {order.customer.email}
                  </p>
                )}

                {order.customer?.phone && (
                  <p>
                    {order.customer.phone}
                  </p>
                )}

                {order.shipping_address && (
                  <div className="address-box">
                    <span>Địa chỉ nhận hàng</span>

                    <p>
                      {order.shipping_address}
                    </p>
                  </div>
                )}

              </div>

            </section>


            {/* Status */}
            <section className="detail-card">

              <div className="card-header">
                <h2>Cập nhật trạng thái</h2>
              </div>

              <div className="status-control">

                <label htmlFor="order-status">
                  Trạng thái đơn hàng
                </label>

                <select
                  id="order-status"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >

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

                <button
                  type="button"
                  onClick={handleStatusUpdate}
                  disabled={
                    updating ||
                    status === order.status
                  }
                >
                  {updating
                    ? "Đang cập nhật..."
                    : "Cập nhật trạng thái"}
                </button>

              </div>

            </section>


            {/* Note */}
            <div className="staff-note">
              <strong>Lưu ý</strong>

              <p>
                Kiểm tra kỹ sản phẩm và thông tin khách hàng
                trước khi chuyển đơn sang trạng thái tiếp theo.
              </p>
            </div>

          </aside>

        </div>

      </div>

    </div>
  );
}

export default StaffOrderDetail;

