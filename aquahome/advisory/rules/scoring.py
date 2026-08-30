from aquahomeapp.models import Product

def _numeric_similarity(a, b, value_range):
    if a is None or b is None:
        return None
    if value_range is None or value_range <= 0:
        return 1.0 if a == b else 0.0
    sim = 1.0 - abs(a - b) / value_range
    return max(0.0, min(1.0, sim))

def _categorical_similarity(a, b):
    if a is None or b is None:
        return None

    return 1.0 if a == b else 0.0


def gower_similarity(customer_profile, species_profile, weights, numeric_ranges):
    """
    Tính Weighted Gower Similarity trong [0, 1].
    customer_profile / species_profile:
        dict có cùng key, ví dụ:
        {
            "price": 150000,
            "max_length": 6
        }
    weights:
        Trọng số của từng thuộc tính. Không bắt buộc tổng bằng 1.
    numeric_ranges:
        Khoảng chuẩn hóa cho từng thuộc tính numeric.
        Ví dụ:
        {
            "price": 500000,
            "max_length": 30
        }
    Thuộc tính mà khách hàng hoặc loài không có giá trị sẽ được bỏ qua
    khỏi mẫu số và không làm giảm điểm.
    """
    total_weight = 0.0
    weighted_score = 0.0

    for attr, weight in weights.items():
        if weight <= 0:
            continue

        cust_val = customer_profile.get(attr)
        species_val = species_profile.get(attr)

        # Missing value không tham gia tính điểm.
        if cust_val is None or species_val is None:
            continue

        if attr in numeric_ranges:
            sim = _numeric_similarity(
                cust_val,
                species_val,
                numeric_ranges[attr],
            )
        else:
            sim = _categorical_similarity(cust_val, species_val)

        if sim is None:
            continue

        weighted_score += weight * sim
        total_weight += weight

    if total_weight == 0:
        return 0.0

    return max(0.0, min(1.0, weighted_score / total_weight))


def build_species_profile(species, customer_profile=None):
    """
    Ghép hồ sơ của Species và Product phù hợp nhất với sở thích khách hàng.
    """

    customer_profile = customer_profile or {}

    products = Product.objects.filter(
        species=species,
        price__isnull=False
    )

    selected_product = None
    preferred_price = customer_profile.get("price")

    if preferred_price is not None:
        selected_product = min(
            products,
            key=lambda product: abs(
                float(product.price) - preferred_price
            ),
            default=None,
        )
    else:
        # Không có preferred_price thì không chọn Product để tính giá.
        selected_product = None

    return {
        "price": (
            float(selected_product.price)
            if selected_product
            else None
        ),
        "max_length": species.max_length,
        "product": selected_product,
    }

def rank_candidates(
    candidates,
    customer_profile,
    weights,
    numeric_ranges,
    top_n=5
):
    scored = []

    for sp in candidates:
        species_profile = build_species_profile(
            sp,
            customer_profile
        )

        score = gower_similarity(
            customer_profile,
            species_profile,
            weights,
            numeric_ranges
        )

        scored.append((
            sp,
            score,
            species_profile["product"]
        ))

    scored.sort(
        key=lambda item: item[1],
        reverse=True
    )

    return scored[:top_n]