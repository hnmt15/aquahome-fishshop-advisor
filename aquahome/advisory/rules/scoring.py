from collections import defaultdict

from aquahomeapp.models import Product, SpeciesFeature


TEMPERAMENT_FEATURES = ["Ôn hòa", "Bán hung dữ", "Hung dữ"]
LAYER_FEATURES = ["Tầng mặt", "Tầng giữa", "Tầng đáy"]
SOCIAL_FEATURES = ["Sống theo đàn", "Nuôi đơn độc"]

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
    customer_profile / species_profile: dict cùng key, ví dụ
        {"price": 150000, "max_length": 6, "temperament": "Ôn hòa"}
    weights        : trọng số từng thuộc tính (không bắt buộc tổng = 1)
    numeric_ranges : range chuẩn hoá cho thuộc tính numeric. Thuộc tính
                     KHÔNG có trong dict này (như "temperament") được coi
                     là categorical.

    Thuộc tính mà khách hàng hoặc loài không có giá trị sẽ được bỏ qua
    khỏi mẫu số và không làm giảm điểm.

    Nếu KHÔNG có thuộc tính nào để so sánh (total_weight = 0), trả về 1.0
    (trung lập) thay vì 0.0 — 0.0 nghĩa là "hoàn toàn không phù hợp", trong
    khi đây là "không có dữ liệu để đánh giá", 2 ý nghĩa khác nhau.
    """
    total_weight = 0.0
    weighted_score = 0.0

    for attr, weight in weights.items():
        if weight <= 0:
            continue

        cust_val = customer_profile.get(attr)
        species_val = species_profile.get(attr)

        if cust_val is None or species_val is None:
            continue

        if attr in numeric_ranges:
            sim = _numeric_similarity(cust_val, species_val, numeric_ranges[attr])
        else:
            sim = _categorical_similarity(cust_val, species_val)

        if sim is None:
            continue

        weighted_score += weight * sim
        total_weight += weight

    if total_weight == 0:
        return 1.0

    return max(0.0, min(1.0, weighted_score / total_weight))


def _get_features_bulk(species_list):
    """
    Lấy các Feature cần cho scoring trong một lần query.

    Trả về:

    {
        species_id: {
            "temperament": "...",
            "layer": "...",
            "social": "..."
        }
    }
    """

    species_ids = [sp.id for sp in species_list]

    feature_names = (
        TEMPERAMENT_FEATURES
        + LAYER_FEATURES
        + SOCIAL_FEATURES
    )

    rows = SpeciesFeature.objects.filter(
        species_id__in=species_ids,
        feature__name__in=feature_names
    ).values_list(
        "species_id",
        "feature__name"
    )

    features_map = {}

    for species_id, feature_name in rows:

        data = features_map.setdefault(
            species_id,
            {
                "temperament": None,
                "layer": None,
                "social": None,
            }
        )

        if feature_name in TEMPERAMENT_FEATURES:
            data["temperament"] = feature_name

        elif feature_name in LAYER_FEATURES:
            data["layer"] = feature_name

        elif feature_name in SOCIAL_FEATURES:
            data["social"] = feature_name

    return features_map



def _get_products_bulk(species_list):
    """
    Trả về {species_id: [Product, ...]}.
    """
    species_ids = [sp.id for sp in species_list]

    products = Product.objects.filter(species_id__in=species_ids, price__isnull=False)

    grouped = defaultdict(list)
    for product in products:
        grouped[product.species_id].append(product)
    return grouped


def build_species_profile(
    species,
    customer_profile=None,
    temperament_map=None,
    features_map=None,
    products_map=None
):
    customer_profile = customer_profile or {}
    features_map = features_map or {}
    products_map = products_map or {}

    species_features = features_map.get(species.id, {})
    species_products = products_map.get(species.id, [])

    selected_product = None
    preferred_price = customer_profile.get("price")

    # Nếu khách có yêu cầu giá
    if preferred_price is not None:
        selected_product = min(
            species_products,
            key=lambda product: abs(
                float(product.price) - preferred_price
            ),
            default=None,
        )

    # Nếu không yêu cầu giá -> lấy sản phẩm đầu tiên
    elif species_products:
        selected_product = species_products[0]

    return {
        "price": (
            float(selected_product.price)
            if selected_product
            else None
        ),
        "max_length": species.max_length,
        "temperament": species_features.get("temperament"),
        "layer": species_features.get("layer"),
        "social": species_features.get("social"),
        "product": selected_product,
    }


def rank_candidates(
    candidates,
    customer_profile,
    weights,
    numeric_ranges,
    top_n=5
):
    """
    Trả về list[(Species, score, selected_product)]
    sắp xếp giảm dần theo score.
    """

    features_map = _get_features_bulk(candidates)
    products_map = _get_products_bulk(candidates)

    scored = []

    for sp in candidates:
        species_profile = build_species_profile(
            sp,
            customer_profile,
            features_map=features_map,
            products_map=products_map,
        )

        score = gower_similarity(
            customer_profile,
            species_profile,
            weights,
            numeric_ranges,
        )

        selected_product = species_profile["product"]
        print("SP:", type(sp), sp)
        print("PRODUCT:", type(selected_product), selected_product)
        scored.append(
            (sp, score, selected_product)
        )

    scored.sort(
        key=lambda item: item[1],
        reverse=True
    )

    return scored[:top_n]