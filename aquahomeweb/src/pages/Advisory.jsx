import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Advisory.css";

function AdvisoryPage() {
  const [tankSize, setTankSize] = useState("");
  const [temperature, setTemperature] = useState("");
  const [ph, setPh] = useState("");
  const [hasPlants, setHasPlants] = useState(false);

  const [existingSpecies, setExistingSpecies] = useState([]);

  const [preferredPrice, setPreferredPrice] = useState("");
  const [preferredMaxLength, setPreferredMaxLength] = useState("");
  const [temperament, setTemperament] = useState("");
  const [layer, setLayer] = useState("");
  const [social, setSocial] = useState("");

  const [speciesList, setSpeciesList] = useState([]);
  const [results, setResults] = useState(null);
  const [showExploreMessage, setShowExploreMessage] = useState(false);

  const [loadingSpecies, setLoadingSpecies] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Dùng để đảm bảo dữ liệu cũ đã được khôi phục
  // trước khi bắt đầu tự động lưu state mới.
  const [isRestored, setIsRestored] = useState(false);


  // =========================================================
  // LOAD DANH SÁCH LOÀI CÁ
  // =========================================================

  useEffect(() => {
    const loadSpecies = async () => {
      try {
        const response = await api.get("/species");

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        setSpeciesList(data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách loài cá.");
      } finally {
        setLoadingSpecies(false);
      }
    };

    loadSpecies();
  }, []);


  // =========================================================
  // KHÔI PHỤC THÔNG TIN TƯ VẤN
  // =========================================================

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("advisoryState");

      if (saved) {
        const data = JSON.parse(saved);

        setTankSize(data.tankSize ?? "");
        setTemperature(data.temperature ?? "");
        setPh(data.ph ?? "");
        setHasPlants(data.hasPlants ?? false);

        setExistingSpecies(data.existingSpecies ?? []);

        setPreferredPrice(data.preferredPrice ?? "");
        setPreferredMaxLength(data.preferredMaxLength ?? "");
        setTemperament(data.temperament ?? "");
        setLayer(data.layer ?? "");
        setSocial(data.social ?? "");

        setResults(data.results ?? null);
        setShowExploreMessage(
          data.showExploreMessage ?? false
        );
      }
    } catch (err) {
      console.error(
        "Không thể khôi phục thông tin tư vấn:",
        err
      );

      sessionStorage.removeItem("advisoryState");
    } finally {
      // Chỉ sau khi restore xong mới cho phép lưu
      setIsRestored(true);
    }
  }, []);


  // =========================================================
  // TỰ ĐỘNG LƯU THÔNG TIN TƯ VẤN
  // =========================================================

  useEffect(() => {
    // Tránh ghi đè dữ liệu cũ ngay khi component vừa mount.
    if (!isRestored) return;

    const advisoryState = {
      tankSize,
      temperature,
      ph,
      hasPlants,

      existingSpecies,

      preferredPrice,
      preferredMaxLength,
      temperament,
      layer,
      social,

      results,
      showExploreMessage,
    };

    sessionStorage.setItem(
      "advisoryState",
      JSON.stringify(advisoryState)
    );
  }, [
    isRestored,

    tankSize,
    temperature,
    ph,
    hasPlants,

    existingSpecies,

    preferredPrice,
    preferredMaxLength,
    temperament,
    layer,
    social,

    results,
    showExploreMessage,
  ]);


  // =========================================================
  // SUBMIT TƯ VẤN
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setResults(null);
    setShowExploreMessage(false);

    // ---------------------------------------------------------
    // KIỂM TRA KÍCH THƯỚC CÁ
    // ---------------------------------------------------------

    if (
      preferredMaxLength !== "" &&
      (
        Number(preferredMaxLength) < 1 ||
        Number(preferredMaxLength) > 100
      )
    ) {
      setError(
        "Kích thước cá phải nằm trong khoảng 1–100 cm."
      );
      return;
    }


    // ---------------------------------------------------------
    // KIỂM TRA CÓ THÔNG TIN TƯ VẤN HAY CHƯA
    // ---------------------------------------------------------

    const hasAnySelection =
      tankSize !== "" ||
      temperature !== "" ||
      ph !== "" ||
      hasPlants ||
      existingSpecies.length > 0 ||
      preferredPrice !== "" ||
      preferredMaxLength !== "" ||
      temperament !== "" ||
      layer !== "" ||
      social !== "";

    // Nếu người dùng không chọn gì
    // thì không gọi API.
    if (!hasAnySelection) {
      setShowExploreMessage(true);
      return;
    }


    // ---------------------------------------------------------
    // GỌI API
    // ---------------------------------------------------------

    setLoading(true);

    try {
      const payload = {
        tank_size:
          tankSize !== ""
            ? Number(tankSize)
            : null,

        temperature:
          temperature !== ""
            ? Number(temperature)
            : null,

        ph:
          ph !== ""
            ? Number(ph)
            : null,

        has_plants: hasPlants,

        existing_species: existingSpecies,

        preferred_price:
          preferredPrice !== ""
            ? Number(preferredPrice)
            : null,

        preferred_max_length:
          preferredMaxLength !== ""
            ? Number(preferredMaxLength)
            : null,

        preferred_temperament:
          temperament || null,

        preferred_layer:
          layer || null,

        preferred_social:
          social || null,

        top_n: 5,
      };

      const response = await api.post(
        "/advisory/recommend",
        payload
      );

      setResults(response.data);

    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.detail ||
        "Không thể thực hiện tư vấn. Vui lòng thử lại.";

      setError(message);

    } finally {
      setLoading(false);
    }
  };


  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    setTankSize("");
    setTemperature("");
    setPh("");
    setHasPlants(false);

    setExistingSpecies([]);

    setPreferredPrice("");
    setPreferredMaxLength("");
    setTemperament("");
    setLayer("");
    setSocial("");

    setResults(null);
    setError("");
    setShowExploreMessage(false);

    // Xóa luôn dữ liệu đã lưu
    sessionStorage.removeItem("advisoryState");
  };


  return (
    <>
      <Header />

      <main className="advisory-page">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="advisory-header">

          <Link
            to="/"
            className="back-link"
          >
            ← Quay lại cửa hàng
          </Link>

          <h1>
            Tư vấn chọn cá
          </h1>

          <p>
            Hãy cung cấp một số thông tin về hồ cá và sở thích
            của bạn để AquaHome tìm những loài cá phù hợp nhé.
          </p>

        </div>


        {/* =====================================================
            FORM
        ====================================================== */}

        <form
          className="advisory-form"
          onSubmit={handleSubmit}
        >

          {/* =================================================
              01 - ĐIỀU KIỆN HỒ CÁ
          ================================================== */}

          <section className="advisory-section">

            <div className="section-title">

              <span className="section-number">
                01
              </span>

              <div>

                <h2>
                  Điều kiện hồ cá
                </h2>

                <p>
                  Cho biết môi trường hiện tại của hồ cá.
                </p>

              </div>

            </div>


            <div className="form-grid">

              {/* DUNG TÍCH */}

              <div className="form-group">

                <label htmlFor="tankSize">
                  Dung tích hồ
                </label>

                <div className="input-with-unit">

                  <input
                    id="tankSize"
                    type="number"
                    min="0"
                    value={tankSize}
                    onChange={(e) =>
                      setTankSize(e.target.value)
                    }
                    placeholder="Ví dụ: 60"
                  />

                  <span>
                    lít
                  </span>

                </div>

              </div>


              {/* NHIỆT ĐỘ */}

              <div className="form-group">

                <label htmlFor="temperature">
                  Nhiệt độ nước
                </label>

                <div className="input-with-unit">

                  <input
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={temperature}
                    onChange={(e) =>
                      setTemperature(e.target.value)
                    }
                    placeholder="Ví dụ: 26"
                  />

                  <span>
                    °C
                  </span>

                </div>

              </div>


              {/* PH */}

              <div className="form-group">

                <label htmlFor="ph">
                  Độ pH
                </label>

                <input
                  id="ph"
                  type="number"
                  step="0.1"
                  min="0"
                  max="14"
                  value={ph}
                  onChange={(e) =>
                    setPh(e.target.value)
                  }
                  placeholder="Ví dụ: 7.0"
                />

              </div>


              {/* CÂY THỦY SINH */}

              <div className="form-group plant-group">

                <label>
                  Cây thủy sinh
                </label>

                <label className="checkbox-label">

                  <input
                    type="checkbox"
                    checked={hasPlants}
                    onChange={(e) =>
                      setHasPlants(e.target.checked)
                    }
                  />

                  <span>
                    Hồ có trồng cây thủy sinh
                  </span>

                </label>

              </div>

            </div>

          </section>


          {/* =================================================
              02 - CÁ ĐANG NUÔI
          ================================================== */}

          <section className="advisory-section">

            <div className="section-title">

              <span className="section-number">
                02
              </span>

              <div>

                <h2>
                  Cá đang nuôi
                </h2>

                <p>
                  Chọn những loài cá đang có trong hồ để kiểm tra
                  khả năng tương thích.
                </p>

              </div>

            </div>


            <div className="form-group">

              <label htmlFor="existingSpecies">
                Loài cá hiện có
              </label>

              <select
                id="existingSpecies"
                multiple
                value={existingSpecies}
                onChange={(e) => {

                  const values = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );

                  setExistingSpecies(values);

                }}
                disabled={loadingSpecies}
              >

                {loadingSpecies ? (

                  <option>
                    Đang tải danh sách...
                  </option>

                ) : (

                  speciesList.map((species) => (

                    <option
                      key={species.id}
                      value={species.scientific_name}
                    >
                      {species.name_vn}
                    </option>

                  ))

                )}

              </select>

              <small>
                Có thể giữ Ctrl hoặc Command để chọn nhiều loài.
              </small>

            </div>

          </section>


          {/* =================================================
              03 - SỞ THÍCH
          ================================================== */}

          <section className="advisory-section">

            <div className="section-title">

              <span className="section-number">
                03
              </span>

              <div>

                <h2>
                  Sở thích của bạn
                </h2>

                <p>
                  Không bắt buộc. Bạn có thể bỏ qua nếu chưa có
                  yêu cầu cụ thể.
                </p>

              </div>

            </div>


            <div className="form-grid">

              {/* GIÁ */}

              <div className="form-group">

                <label htmlFor="preferredPrice">
                  Mức giá mong muốn
                </label>

                <div className="input-with-unit">

                  <input
                    id="preferredPrice"
                    type="number"
                    min="0"
                    value={preferredPrice}
                    onChange={(e) =>
                      setPreferredPrice(e.target.value)
                    }
                    placeholder="Ví dụ: 50000"
                  />

                  <span>
                    VNĐ
                  </span>

                </div>

                <small>
                  Mức giá gần với ngân sách của bạn.
                </small>

              </div>


              {/* KÍCH THƯỚC */}

              <div className="form-group">

                <label htmlFor="preferredMaxLength">
                  Kích thước cá mong muốn
                </label>

                <div className="input-with-unit">

                  <input
                    id="preferredMaxLength"
                    type="number"
                    min="1"
                    max="100"
                    step="1"
                    value={preferredMaxLength}
                    onChange={(e) =>
                      setPreferredMaxLength(e.target.value)
                    }
                    placeholder="Ví dụ: 10"
                  />

                  <span>
                    cm
                  </span>

                </div>

                <small>
                  Nhập kích thước từ 1–100 cm.
                </small>

              </div>


              {/* TÍNH CÁCH */}

              <div className="form-group">

                <label htmlFor="temperament">
                  Tính cách
                </label>

                <select
                  id="temperament"
                  value={temperament}
                  onChange={(e) =>
                    setTemperament(e.target.value)
                  }
                >

                  <option value="">
                    Không yêu cầu
                  </option>

                  <option value="Ôn hòa">
                    Hiền hòa
                  </option>

                  <option value="Bán hung dữ">
                    Bán hung dữ
                  </option>

                  <option value="Hung dữ">
                    Hung dữ
                  </option>

                </select>

                <small>
                  Mức độ hiền hoặc hung dữ của cá.
                </small>

              </div>


              {/* TẦNG BƠI */}

              <div className="form-group">

                <label htmlFor="layer">
                  Tầng bơi
                </label>

                <select
                  id="layer"
                  value={layer}
                  onChange={(e) =>
                    setLayer(e.target.value)
                  }
                >

                  <option value="">
                    Không yêu cầu
                  </option>

                  <option value="Tầng mặt">
                    Tầng mặt
                  </option>

                  <option value="Tầng giữa">
                    Tầng giữa
                  </option>

                  <option value="Tầng đáy">
                    Tầng đáy
                  </option>

                </select>

                <small>
                  Vị trí cá thường hoạt động trong hồ.
                </small>

              </div>


              {/* KIỂU SỐNG */}

              <div className="form-group">

                <label htmlFor="social">
                  Kiểu sống
                </label>

                <select
                  id="social"
                  value={social}
                  onChange={(e) =>
                    setSocial(e.target.value)
                  }
                >

                  <option value="">
                    Không yêu cầu
                  </option>

                  <option value="Sống theo đàn">
                    Sống theo đàn
                  </option>

                  <option value="Nuôi đơn độc">
                    Nuôi đơn độc
                  </option>

                </select>

                <small>
                  Cá thích sống theo đàn hay nuôi riêng.
                </small>

              </div>

            </div>

          </section>


          {/* =================================================
              ERROR
          ================================================== */}

          {error && (
            <div className="advisory-error">
              {error}
            </div>
          )}


          {/* =================================================
              ACTIONS
          ================================================== */}

          <div className="advisory-actions">

            <button
              type="button"
              className="reset-button"
              onClick={handleReset}
            >
              Xóa lựa chọn
            </button>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >

              {loading
                ? "Đang tìm cá phù hợp..."
                : "Tìm cá phù hợp"}

            </button>

          </div>

        </form>


        {/* =====================================================
            CHƯA CHỌN THÔNG TIN
        ====================================================== */}

        {showExploreMessage && (

          <div className="explore-message">

            <div className="explore-icon">
              ♢
            </div>

            <h2>
              Hãy khám phá các sản phẩm của AquaHome
            </h2>

            <p>
              Bạn chưa cung cấp thông tin tư vấn nào.
              Hãy khám phá cửa hàng để tìm hiểu thêm về các
              loài cá và sản phẩm đang được cung cấp.
            </p>

            <Link
              to="/products"
              className="explore-button"
            >
              Khám phá sản phẩm →
            </Link>

          </div>

        )}


        {/* =====================================================
            RESULTS
        ====================================================== */}

        {results && (

          <section className="advisory-results">

            {/* =================================================
                RESULTS HEADER
            ================================================== */}

            <div className="results-header">

              <h2>
                Kết quả tư vấn
              </h2>

              <p>
                Các loài cá được lựa chọn dựa trên những
                thông tin bạn đã cung cấp.
              </p>

              <div className="results-note">
                Các bộ lọc đã giúp bạn tìm ra những cái tên tối ưu nhất theo tiêu chuẩn đặt ra. Dẫu vậy, cá có sống khỏe hay không lại phụ thuộc hoàn toàn vào tay nghề setup và vận hành bể thực tế của bạn. Thêm vào đó, dữ liệu của cửa hàng chỉ có giới hạn và chưa thể gom đủ mọi loài trên thế giới nên nếu thấy danh sách hơi hạn chế, đừng vội nản lòng nhé!
              </div>

            </div>


            {/* =================================================
                CÓ KẾT QUẢ
            ================================================== */}

            {results.results?.length > 0 ? (

              <div className="result-list">

                {results.results.map((item, index) => {

                  const product = item.product;
                  const species = item.species;

                  return (

                    <article
                      className="result-card"
                      key={
                        species?.id || index
                      }
                    >

                      {/* RANK */}

                      <div className="result-rank">
                        #{index + 1}
                      </div>


                      {/* IMAGE */}

                      <div className="result-image-wrapper">

                        {product?.image ? (

                          <img
                            src={product.image}
                            alt={
                              product.name ||
                              species?.name_vn ||
                              "Sản phẩm"
                            }
                            className="result-image"
                          />

                        ) : (

                          <div className="result-image-placeholder">
                            Chưa có ảnh
                          </div>

                        )}

                      </div>


                      {/* INFO */}

                      <div className="result-info">

                        <h3>
                          {species?.name_vn ||
                            "Chưa có tên loài"}
                        </h3>


                        {species?.scientific_name && (

                          <p className="scientific-name">
                            {species.scientific_name}
                          </p>

                        )}


                        {product?.name && (

                          <p className="result-product">

                            <span>
                              Sản phẩm:
                            </span>{" "}

                            {product.name}

                          </p>

                        )}


                        {product?.price != null && (

                          <p className="result-price">

                            {Number(
                              product.price
                            ).toLocaleString("vi-VN")}{" "}

                            VNĐ

                          </p>

                        )}


                        {product?.id && (

                          <Link
                            to={`/products/${product.id}`}
                            className="result-product-link"
                          >
                            Xem sản phẩm
                          </Link>

                        )}

                      </div>


                      {/* SCORE */}

                      {item.score !== null &&
                        item.score !== undefined && (

                          <div className="result-score">

                            <strong>
                              {Math.round(
                                item.score * 100
                              )}%
                            </strong>

                            <span>
                              phù hợp
                            </span>

                          </div>

                        )}

                    </article>

                  );

                })}

              </div>

            ) : (

              /* =================================================
                 KHÔNG CÓ KẾT QUẢ
              ================================================== */

              <div className="empty-result">

                <div className="empty-result-icon">
                  ○
                </div>

                <h3>
                  Chưa tìm thấy loài cá phù hợp
                </h3>

                <p>
                  Với những điều kiện hồ cá và yêu cầu bạn
                  đã cung cấp, hiện chưa có loài cá nào
                  trong dữ liệu của AquaHome đáp ứng được
                  các tiêu chí tư vấn.
                </p>

                <p>
                  Bạn có thể thử thay đổi một vài tiêu chí
                  hoặc tham quan cửa hàng để xem thêm các
                  sản phẩm hiện có.
                </p>

                <Link
                  to="/products"
                  className="explore-button"
                >
                  Tham quan sản phẩm
                </Link>

              </div>

            )}


            {/* =================================================
                REJECTED SPECIES
            ================================================== */}

            {results.rejected?.length > 0 && (

              <div className="rejected-section">

                <h3>
                  Một số loài không được đề xuất
                </h3>

                <p>
                  Các loài dưới đây không được đề xuất do
                  có khả năng không tương thích với điều
                  kiện hồ hoặc cá đang nuôi.
                </p>

                <ul>

                  {results.rejected.map((item) => (

                    <li key={item.id}>

                      <strong>
                        {item.name}
                      </strong>

                      {item.reasons?.length > 0 && (

                        <ul>

                          {item.reasons.map(
                            (reason, reasonIndex) => (

                              <li key={reasonIndex}>
                                {reason}
                              </li>

                            )
                          )}

                        </ul>

                      )}

                    </li>

                  ))}

                </ul>

              </div>

            )}


            {/* =================================================
                LINK SHOP
            ================================================== */}

            {results.results?.length > 0 && (

              <div className="results-shop-link">

                <p>
                  Muốn xem thêm các loài cá và sản phẩm khác?
                </p>

                <Link
                  to="/products"
                  className="explore-button secondary"
                >
                  Tham quan cửa hàng
                </Link>

              </div>

            )}

          </section>

        )}

      </main>

      <Footer />
    </>
  );
}

export default AdvisoryPage;