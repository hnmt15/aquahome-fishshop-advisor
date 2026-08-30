import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Advisory.css";

function Advisory() {
    const navigate = useNavigate();

    const [hasTank, setHasTank] = useState(false);
    const [tankSize, setTankSize] = useState("");
    const [temperature, setTemperature] = useState("");
    const [ph, setPh] = useState("");
    const [hasPlants, setHasPlants] = useState(false);

    const [existingSpecies, setExistingSpecies] = useState("");
    const [preferredPrice, setPreferredPrice] = useState("");
    const [preferredMaxLength, setPreferredMaxLength] = useState("");
    const [topN, setTopN] = useState(5);

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setResults([]);
        setSubmitted(false);

        // Nếu có bể thì bắt buộc nhập đủ 3 thông tin
        if (hasTank) {
            if (!tankSize || !temperature || !ph) {
                setError(
                    "Vui lòng nhập đầy đủ thể tích bể, nhiệt độ và pH."
                );
                return;
            }
        }

        setLoading(true);

        try {
            const data = {
                top_n: Number(topN),
                has_plants: hasPlants,
                existing_species: existingSpecies
                    ? existingSpecies
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean)
                    : [],
            };

            if (hasTank) {
                data.tank_size = Number(tankSize);
                data.temperature = Number(temperature);
                data.ph = Number(ph);
            }

            if (preferredPrice !== "") {
                data.preferred_price = Number(preferredPrice);
            }

            if (preferredMaxLength !== "") {
                data.preferred_max_length = Number(preferredMaxLength);
            }

            const response = await api.post(
                "/api/advisory/recommend/",
                data
            );

            setResults(response.data.results || []);
            setSubmitted(true);
        } catch (err) {
            console.error("Advisory error:", err);

            if (err.response?.data) {
                const responseData = err.response.data;

                if (typeof responseData === "string") {
                    setError(responseData);
                } else if (responseData.detail) {
                    setError(responseData.detail);
                } else if (responseData.non_field_errors) {
                    setError(responseData.non_field_errors.join(", "));
                } else {
                    setError(
                        Object.values(responseData)
                            .flat()
                            .join(" ")
                    );
                }
            } else {
                setError(
                    "Không thể kết nối đến hệ thống tư vấn. Vui lòng thử lại."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setHasTank(false);
        setTankSize("");
        setTemperature("");
        setPh("");
        setHasPlants(false);
        setExistingSpecies("");
        setPreferredPrice("");
        setPreferredMaxLength("");
        setTopN(5);
        setResults([]);
        setError("");
        setSubmitted(false);
    };

    return (
        <div className="advisory-page">
            <div className="advisory-container">

                {/* Header */}
                <div className="advisory-header">
                    <button
                        className="advisory-back"
                        onClick={() => navigate(-1)}
                    >
                        ← Quay lại
                    </button>

                    <div className="advisory-title">
                        <span className="advisory-icon">🐠</span>
                        <div>
                            <h1>Tư vấn cá cảnh</h1>
                            <p>
                                Tìm những loài cá phù hợp với bể và nhu cầu
                                của bạn
                            </p>
                        </div>
                    </div>
                </div>

                {/* Progress */}
                <div className="advisory-process">
                    <div className="process-item active">
                        <span>1</span>
                        <p>Thông tin bể</p>
                    </div>

                    <div className="process-line"></div>

                    <div className="process-item active">
                        <span>2</span>
                        <p>Cá đang nuôi</p>
                    </div>

                    <div className="process-line"></div>

                    <div className="process-item active">
                        <span>3</span>
                        <p>Nhu cầu</p>
                    </div>

                    <div className="process-line"></div>

                    <div className="process-item">
                        <span>4</span>
                        <p>Kết quả</p>
                    </div>
                </div>

                <div className="advisory-content">

                    {/* Form */}
                    <form
                        className="advisory-form"
                        onSubmit={handleSubmit}
                    >

                        {/* Section 1 */}
                        <section className="advisory-section">
                            <div className="section-title">
                                <div className="section-number">1</div>
                                <div>
                                    <h2>Thông tin bể cá</h2>
                                    <p>
                                        Cho chúng tôi biết điều kiện bể của
                                        bạn
                                    </p>
                                </div>
                            </div>

                            <div className="tank-choice">
                                <label
                                    className={`choice-card ${
                                        !hasTank ? "selected" : ""
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="tank"
                                        checked={!hasTank}
                                        onChange={() => setHasTank(false)}
                                    />
                                    <div>
                                        <strong>Chưa có bể</strong>
                                        <span>
                                            Tôi đang tìm cá cho bể mới
                                        </span>
                                    </div>
                                </label>

                                <label
                                    className={`choice-card ${
                                        hasTank ? "selected" : ""
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="tank"
                                        checked={hasTank}
                                        onChange={() => setHasTank(true)}
                                    />
                                    <div>
                                        <strong>Đã có bể</strong>
                                        <span>
                                            Tôi muốn chọn cá cho bể hiện tại
                                        </span>
                                    </div>
                                </label>
                            </div>

                            {hasTank && (
                                <div className="tank-fields">
                                    <div className="form-group">
                                        <label>
                                            Thể tích bể
                                            <span>*</span>
                                        </label>

                                        <div className="input-with-unit">
                                            <input
                                                type="number"
                                                min="1"
                                                step="0.1"
                                                value={tankSize}
                                                onChange={(e) =>
                                                    setTankSize(e.target.value)
                                                }
                                                placeholder="Ví dụ: 60"
                                            />
                                            <span>lít</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            Nhiệt độ
                                            <span>*</span>
                                        </label>

                                        <div className="input-with-unit">
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={temperature}
                                                onChange={(e) =>
                                                    setTemperature(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Ví dụ: 26"
                                            />
                                            <span>°C</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            Độ pH
                                            <span>*</span>
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            max="14"
                                            step="0.1"
                                            value={ph}
                                            onChange={(e) =>
                                                setPh(e.target.value)
                                            }
                                            placeholder="Ví dụ: 7.0"
                                        />
                                    </div>

                                    <label className="plant-checkbox">
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
                                </div>
                            )}
                        </section>

                        {/* Section 2 */}
                        <section className="advisory-section">
                            <div className="section-title">
                                <div className="section-number">2</div>
                                <div>
                                    <h2>Cá đang nuôi</h2>
                                    <p>
                                        Giúp hệ thống kiểm tra khả năng nuôi
                                        chung
                                    </p>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>
                                    Các loài cá đang nuôi
                                </label>

                                <input
                                    type="text"
                                    value={existingSpecies}
                                    onChange={(e) =>
                                        setExistingSpecies(e.target.value)
                                    }
                                    placeholder="Ví dụ: Betta splendens, Corydoras aeneus"
                                />

                                <small>
                                    Nhập tên khoa học, phân cách nhiều loài
                                    bằng dấu phẩy. Có thể bỏ trống nếu chưa
                                    nuôi cá.
                                </small>
                            </div>

                            <div className="info-box">
                                <span>💡</span>
                                <p>
                                    Nếu bạn đang nuôi cá, hệ thống sẽ kiểm tra
                                    khả năng tương thích dựa trên điều kiện
                                    môi trường, kích thước, tập tính và tầng
                                    nước.
                                </p>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section className="advisory-section">
                            <div className="section-title">
                                <div className="section-number">3</div>
                                <div>
                                    <h2>Nhu cầu của bạn</h2>
                                    <p>
                                        Không bắt buộc — giúp kết quả phù hợp
                                        hơn
                                    </p>
                                </div>
                            </div>

                            <div className="preference-fields">
                                <div className="form-group">
                                    <label>
                                        Mức giá mong muốn
                                    </label>

                                    <div className="input-with-unit">
                                        <input
                                            type="number"
                                            min="0"
                                            value={preferredPrice}
                                            onChange={(e) =>
                                                setPreferredPrice(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Ví dụ: 150000"
                                        />
                                        <span>VNĐ</span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>
                                        Kích thước cá mong muốn
                                    </label>

                                    <div className="input-with-unit">
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.1"
                                            value={preferredMaxLength}
                                            onChange={(e) =>
                                                setPreferredMaxLength(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Ví dụ: 6"
                                        />
                                        <span>cm</span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>
                                        Số lượng kết quả
                                    </label>

                                    <select
                                        value={topN}
                                        onChange={(e) =>
                                            setTopN(e.target.value)
                                        }
                                    >
                                        <option value={3}>3 loài</option>
                                        <option value={5}>5 loài</option>
                                        <option value={10}>10 loài</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {error && (
                            <div className="advisory-error">
                                <span>⚠</span>
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="form-actions">
                            <button
                                type="button"
                                className="reset-button"
                                onClick={handleReset}
                            >
                                Làm lại
                            </button>

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Đang phân tích...
                                    </>
                                ) : (
                                    <>
                                        🔍 Tư vấn cho tôi
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Results */}
                    <div className="advisory-results">

                        {!submitted && !loading && (
                            <div className="result-empty">
                                <div className="empty-icon">🐟</div>
                                <h2>Kết quả tư vấn</h2>
                                <p>
                                    Điền thông tin bên trái và nhấn
                                    <strong> "Tư vấn cho tôi"</strong>
                                    để hệ thống tìm những loài cá phù hợp.
                                </p>

                                <div className="engine-info">
                                    <div>
                                        <span>01</span>
                                        <p>Lọc điều kiện môi trường</p>
                                    </div>

                                    <div>
                                        <span>02</span>
                                        <p>Kiểm tra tương thích</p>
                                    </div>

                                    <div>
                                        <span>03</span>
                                        <p>Xếp hạng độ phù hợp</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {loading && (
                            <div className="result-empty">
                                <div className="loading-animation">
                                    <span>🐠</span>
                                </div>

                                <h2>Đang phân tích...</h2>

                                <p>
                                    Hệ thống đang kiểm tra điều kiện bể và
                                    khả năng tương thích giữa các loài cá.
                                </p>
                            </div>
                        )}

                        {submitted && !loading && (
                            <div className="result-list">

                                <div className="result-heading">
                                    <div>
                                        <span className="result-label">
                                            KẾT QUẢ TƯ VẤN
                                        </span>

                                        <h2>
                                            Những loài cá phù hợp
                                        </h2>
                                    </div>

                                    <span className="result-count">
                                        {results.length} kết quả
                                    </span>
                                </div>

                                {results.length === 0 ? (
                                    <div className="no-result">
                                        <div>😔</div>
                                        <h3>
                                            Không tìm thấy loài phù hợp
                                        </h3>
                                        <p>
                                            Hãy thử thay đổi điều kiện bể hoặc
                                            nhu cầu của bạn rồi thử lại.
                                        </p>
                                    </div>
                                ) : (
                                    results.map((fish, index) => (
                                        <div
                                            className="fish-result-card"
                                            key={fish.id}
                                        >
                                            <div className="fish-rank">
                                                #{index + 1}
                                            </div>

                                            <div className="fish-image">
                                                🐟
                                            </div>

                                            <div className="fish-info">
                                                <h3>{fish.name}</h3>

                                                <p className="scientific-name">
                                                    {fish.scientific_name}
                                                </p>

                                                <div className="fish-meta">
                                                    <span>
                                                        Độ phù hợp
                                                    </span>

                                                    <div className="score-bar">
                                                        <div
                                                            className="score-fill"
                                                            style={{
                                                                width: `${Math.max(
                                                                    0,
                                                                    Math.min(
                                                                        100,
                                                                        fish.score *
                                                                            100
                                                                    )
                                                                )}%`,
                                                            }}
                                                        ></div>
                                                    </div>

                                                    <strong>
                                                        {(
                                                            fish.score * 100
                                                        ).toFixed(0)}
                                                        %
                                                    </strong>
                                                </div>
                                            </div>

                                            <button
                                                className="detail-button"
                                                onClick={() =>
                                                    navigate(
                                                        `/products/${fish.id}`
                                                    )
                                                }
                                            >
                                                Xem cá
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Advisory;