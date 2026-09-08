import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "./Advisory.css";

function AdvisoryPage() {
  const [tankSize, setTankSize] = useState("");
  const [temperature, setTemperature] = useState("");
  const [ph, setPh] = useState("");
  const [hasPlants, setHasPlants] = useState(false);

  const [existingSpecies, setExistingSpecies] = useState([]);

  const [preferredPrice, setPreferredPrice] = useState("");
  const [preferredMaxLength, setPreferredMaxLength] = useState("");


  const [speciesList, setSpeciesList] = useState([]);
  const [results, setResults] = useState(null);

  const [loadingSpecies, setLoadingSpecies] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const loadSpecies = async () => {
      try {
        setLoadingSpecies(true);

        const response = await api.get("/species");

        //response.data.results
        //response.data
        const data = response.data;

        if (Array.isArray(data)) {
          setSpeciesList(data);
        } else {
          setSpeciesList(data.results || []);
        }
      } catch (err) {
        console.error("Load species error:", err);

        setError(
          "Không thể tải danh sách loài cá. Vui lòng thử lại sau."
        );
      } finally {
        setLoadingSpecies(false);
      }
    };

    loadSpecies();
  }, []);

  // =========================
  // SELECT EXISTING SPECIES
  // =========================
  const handleSpeciesChange = (e) => {
    const selectedSpecies = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setExistingSpecies(selectedSpecies);
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setResults(null);
    setLoading(true);

    try {
      const payload = {
        // Không biết thì gửi null
        tank_size: tankSize !== "" ? Number(tankSize) : null,
        temperature:
          temperature !== "" ? Number(temperature) : null,
        ph: ph !== "" ? Number(ph) : null,

        has_plants: hasPlants,

        // Có thể là [] nếu khách không chọn loài nào
        existing_species: existingSpecies,

        preferred_price:
          preferredPrice !== ""
            ? Number(preferredPrice)
            : null,

        preferred_max_length:
          preferredMaxLength !== ""
            ? Number(preferredMaxLength)
            : null,

        top_n: 5,
      };

      const response = await api.post(
        "/advisory/recommend",
        payload
      );

      setResults(response.data.results || []);

      // Cuộn xuống phần kết quả
      setTimeout(() => {
        document
          .getElementById("advisory-results")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } catch (err) {
      console.error("Advisory error:", err);

      const responseData = err.response?.data;

      if (typeof responseData === "string") {
        setError(responseData);
      } else if (responseData?.detail) {
        setError(responseData.detail);
      } else if (responseData?.non_field_errors) {
        setError(
          responseData.non_field_errors.join(" ")
        );
      } else {
        setError(
          "Không thể thực hiện tư vấn. Vui lòng thử lại."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESET / TRY AGAIN
  // =========================
  const handleRetry = () => {
    setResults(null);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="advisory-page">
      <div className="advisory-container">

        {/* =========================================
            HEADER
        ========================================== */}
        <header className="advisory-header">
          <span className="advisory-label">
            AQUAHOME ADVISORY
          </span>

          <h1>Tìm loài cá phù hợp với bạn</h1>

          <p>
            Cung cấp một vài thông tin về bể cá và sở thích
            của bạn. AquaHome sẽ phân tích và đề xuất những
            loài cá phù hợp trong phạm vi dữ liệu của cửa hàng.
          </p>
        </header>


        {/* =========================================
            IMPORTANT NOTE
        ========================================== */}
        <div className="advisory-note">
          <div className="note-icon">i</div>

          <div>
            <strong>Lưu ý trước khi tư vấn</strong>

            <p>
              Kết quả tư vấn được xây dựng dựa trên dữ liệu
              và các loài cá hiện có trong hệ thống AquaHome.
              Vì vậy, kết quả chỉ giới hạn trong phạm vi tài
              nguyên của cửa hàng và không đại diện cho toàn
              bộ các loài cá có thể nuôi trên thực tế.
            </p>

            <p>
              Bạn không cần biết chính xác tất cả thông tin.
              Những thông tin bạn chưa biết có thể bỏ trống.
              Hệ thống sẽ tự xử lý dựa trên những dữ liệu
              bạn cung cấp.
            </p>
          </div>
        </div>


        {/* =========================================
            ERROR
        ========================================== */}
        {error && (
          <div className="advisory-error">
            {error}
          </div>
        )}


        {/* =========================================
            FORM
        ========================================== */}
        <form onSubmit={handleSubmit}>

          {/* =======================================
              SECTION 01 — TANK
          ======================================== */}
          <section className="advisory-section">

            <div className="section-heading">
              <span>01</span>

              <div>
                <h2>Thông tin bể cá</h2>

                <p>
                  Những thông tin này giúp hệ thống xác
                  định môi trường phù hợp cho cá.
                </p>
              </div>
            </div>


            <div className="form-grid">

              {/* Tank size */}
              <div className="form-group">
                <label htmlFor="tank-size">
                  Thể tích bể
                </label>

                <div className="input-with-unit">
                  <input
                    id="tank-size"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Ví dụ: 60"
                    value={tankSize}
                    onChange={(e) =>
                      setTankSize(e.target.value)
                    }
                  />

                  <span>lít</span>
                </div>

                <small>
                  Nếu chưa biết, bạn có thể bỏ trống.
                </small>
              </div>


              {/* Temperature */}
              <div className="form-group">
                <label htmlFor="temperature">
                  Nhiệt độ nước
                </label>

                <div className="input-with-unit">
                  <input
                    id="temperature"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Ví dụ: 26"
                    value={temperature}
                    onChange={(e) =>
                      setTemperature(e.target.value)
                    }
                  />

                  <span>°C</span>
                </div>

                <small>
                  Nếu không rõ, có thể bỏ trống.
                </small>
              </div>


              {/* pH */}
              <div className="form-group">
                <label htmlFor="ph">
                  Độ pH
                </label>

                <div className="input-with-unit">
                  <input
                    id="ph"
                    type="number"
                    min="0"
                    max="14"
                    step="0.1"
                    placeholder="Ví dụ: 7.0"
                    value={ph}
                    onChange={(e) =>
                      setPh(e.target.value)
                    }
                  />
                </div>

                <small>
                  Nếu không rõ, có thể bỏ trống.
                </small>
              </div>


              {/* Plants */}
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={hasPlants}
                    onChange={(e) =>
                      setHasPlants(e.target.checked)
                    }
                  />

                  <span>
                    Bể có trồng cây thủy sinh
                  </span>
                </label>

                <small>
                  Bỏ chọn nếu bể không có cây hoặc bạn
                  không chắc chắn.
                </small>
              </div>

            </div>

          </section>


          {/* =======================================
              SECTION 02 — EXISTING SPECIES
          ======================================== */}
          <section className="advisory-section">

            <div className="section-heading">
              <span>02</span>

              <div>
                <h2>Cá bạn đang nuôi</h2>

                <p>
                  Chọn những loài cá hiện đang sống trong
                  bể để hệ thống kiểm tra khả năng tương thích.
                </p>
              </div>
            </div>


            <div className="form-group species-group">

              <label htmlFor="existing-species">
                Các loài đang nuôi
              </label>

              {loadingSpecies ? (
                <div className="species-loading">
                  Đang tải danh sách loài cá...
                </div>
              ) : (
                <select
                  id="existing-species"
                  multiple
                  value={existingSpecies}
                  onChange={handleSpeciesChange}
                  className="species-select"
                >
                  {speciesList.map((species) => (
                    <option
                      key={species.id}
                      value={species.scientific_name}
                    >
                      {species.name_vn} (
                      {species.scientific_name}
                      )
                    </option>
                  ))}
                </select>
              )}

              <small>
                Giữ Ctrl (Windows) hoặc Command (Mac)
                để chọn nhiều loài.
              </small>

              <small>
                Nếu bạn chưa nuôi cá hoặc không rõ,
                có thể bỏ trống phần này.
              </small>

              {existingSpecies.length > 0 && (
                <div className="selected-species-count">
                  Đã chọn{" "}
                  <strong>
                    {existingSpecies.length}
                  </strong>{" "}
                  loài
                </div>
              )}

            </div>

          </section>


          {/* =======================================
              SECTION 03 — PREFERENCES
          ======================================== */}
          <section className="advisory-section">

            <div className="section-heading">
              <span>03</span>

              <div>
                <h2>Sở thích của bạn</h2>

                <p>
                  Những thông tin này giúp hệ thống xếp
                  hạng các loài phù hợp với nhu cầu của bạn.
                </p>
              </div>
            </div>


            <div className="form-grid">

              {/* Price */}
              <div className="form-group">
                <label htmlFor="preferred-price">
                  Mức giá mong muốn
                </label>

                <div className="input-with-unit">
                  <input
                    id="preferred-price"
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="Ví dụ: 150000"
                    value={preferredPrice}
                    onChange={(e) =>
                      setPreferredPrice(e.target.value)
                    }
                  />

                  <span>VNĐ</span>
                </div>

                <small>
                  Không bắt buộc. Có thể bỏ trống nếu chưa
                  xác định ngân sách.
                </small>
              </div>


              {/* Length */}
              <div className="form-group">
                <label htmlFor="preferred-length">
                  Kích thước cá mong muốn
                </label>

                <div className="input-with-unit">
                  <input
                    id="preferred-length"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Ví dụ: 6"
                    value={preferredMaxLength}
                    onChange={(e) =>
                      setPreferredMaxLength(e.target.value)
                    }
                  />

                  <span>cm</span>
                </div>

                <small>
                  Không bắt buộc. Có thể bỏ trống nếu chưa
                  có sở thích cụ thể.
                </small>
              </div>

            </div>


            <div className="optional-note">
              <strong>Không chắc chắn?</strong>{" "}
              Không sao cả. Bạn có thể bỏ trống các thông
              tin chưa biết và để hệ thống tư vấn dựa trên
              những dữ liệu hiện có.
            </div>

          </section>


          {/* =======================================
              SUBMIT
          ======================================== */}
          <div className="advisory-submit">

            <button
              type="submit"
              disabled={loading || loadingSpecies}
            >
              {loading
                ? "Đang phân tích..."
                : "Nhận tư vấn"}
            </button>

            <p>
              Kết quả được tạo dựa trên các tiêu chí tương
              thích và dữ liệu sản phẩm hiện có của AquaHome.
            </p>

          </div>

        </form>


        {/* =========================================
            RESULTS
        ========================================== */}
        {results !== null && (
          <section
            id="advisory-results"
            className="advisory-results"
          >

            {/* =======================================
                HAS RESULTS
            ======================================== */}
            {results.length > 0 ? (
              <>
                <div className="results-header">
                  <span>
                    AQUAHOME RECOMMENDATION
                  </span>

                  <h2>
                    Những loài có thể phù hợp với bạn
                  </h2>

                  <p>
                    Dưới đây là những lựa chọn được xếp
                    hạng cao nhất dựa trên thông tin bạn
                    cung cấp.
                  </p>
                </div>


                <div className="results-grid">

                  {results.map((item, index) => (
                    <article
                      className="species-result-card"
                      key={item.id}
                    >

                      <div className="result-score">
                        {Math.round(item.score * 100)}%

                        <span>phù hợp</span>
                      </div>


                      <div className="result-info">

                        <h3>
                          {item.name}
                        </h3>

                        <p className="scientific-name">
                          {item.scientific_name}
                        </p>

                      </div>


                      <Link
                        to={`/products?species=${item.id}`}
                        className="result-button"
                      >
                        Xem sản phẩm
                      </Link>

                    </article>
                  ))}

                </div>
              </>
            ) : (

              /* =====================================
                 EMPTY RESULT
              ====================================== */
              <div className="advisory-empty">

                <div className="empty-icon">
                  🐟
                </div>

                <h2>
                  Chưa tìm thấy loài cá phù hợp
                </h2>

                <p>
                  Với những điều kiện và các loài cá bạn
                  đã chọn, hiện tại AquaHome chưa tìm được
                  lựa chọn phù hợp trong phạm vi dữ liệu
                  của cửa hàng.
                </p>

                <p>
                  Đừng lo nhé! Bạn có thể thử thay đổi
                  một vài thông tin tư vấn hoặc khám phá
                  thêm các sản phẩm hiện có tại AquaHome.
                </p>

                <div className="empty-actions">

                  <button
                    type="button"
                    className="retry-button"
                    onClick={handleRetry}
                  >
                    Thử tư vấn lại
                  </button>

                  <Link
                    to="/products"
                    className="shop-button"
                  >
                    Khám phá AquaHome
                  </Link>

                </div>

              </div>

            )}

          </section>
        )}

      </div>
    </main>
  );
}

export default AdvisoryPage;

