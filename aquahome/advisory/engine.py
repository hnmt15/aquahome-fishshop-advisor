from aquahomeapp.models import Species, Product
from aquahomeapp.models import ProductRecommendation

from .rules.filter1 import filter_by_environment, infer_environment_from_existing_species
from .rules.filter2 import filter_by_compatibility
from .rules.scoring import rank_candidates
from collections import defaultdict
from django.db.models import Max, Min
DEFAULT_WEIGHTS = {
    "price": 0.5,
    "max_length": 0.5,
}

def get_numeric_ranges():
    price_range_data = Product.objects.filter(
        price__isnull=False
    ).aggregate(
        min_price=Min("price"),
        max_price=Max("price"),
    )

    length_range_data = Species.objects.filter(
        max_length__isnull=False
    ).aggregate(
        min_length=Min("max_length"),
        max_length=Max("max_length"),
    )
    min_price = price_range_data["min_price"]
    max_price = price_range_data["max_price"]
    min_length = length_range_data["min_length"]
    max_length = length_range_data["max_length"]
    return {
        "price": float(max_price - min_price)
        if min_price is not None and max_price is not None
        else 0.0,

        "max_length": float(max_length - min_length)
        if min_length is not None and max_length is not None
        else 0.0,
    }


def get_product_recommendations(species_list, limit=5):
    species_ids = [sp.id for sp in species_list]
    rows = (
        ProductRecommendation.objects.filter(species_id__in=species_ids)
        .select_related("product")
        .order_by("species_id")
    )

    grouped = defaultdict(list)
    for row in rows:
        if len(grouped[row.species_id]) < limit:
            grouped[row.species_id].append(row)

    return grouped


def recommend(
        tank_size=None,
        temperature=None,
        ph=None,
        has_plants=False,
        existing_species_names=None,
        customer_preferences=None,
        top_n=5,
):
    """
    Hàm tổng, chạy toàn bộ 4 bước và trả về kết quả cho API.

    tank_size                : thể tích bể (lít) — KHÔNG suy luận được, để
                                None nếu khách chưa cung cấp
    temperature, ph          : để None nếu khách không tự nhập; nếu khách có
                                cá đang nuôi, engine sẽ tự suy luận thay thế
    has_plants               : bể có trồng cây hay không
    existing_species_names   : list[str] scientific_name các loài khách đang
                                nuôi; None hoặc [] -> bỏ qua Bước 2
    customer_preferences     : dict sở thích khách hàng cho Bước 3, ví dụ
                                {"price": 150000, "max_length": 8}
    top_n                    : số lượng khuyến nghị trả về

    Trả về dict:
        {
            "results": [
                {
                    "species": Species,
                    "score": float,
                    "products": [ProductRecommendation, ...],
                },
                ...
            ],
            "rejected_tier2": {species_id: [lý do, ...]},  # để debug/giải thích
            "steps_applied": {
                "tank_size_filter": bool,   # Bước 1 có áp dụng tank_size không
                "temperature_filter": bool, # Bước 1 có áp dụng temperature không
                "ph_filter": bool,          # Bước 1 có áp dụng ph không
                "tier2": bool,              # Bước 2 có chạy không
            },
        }
    """
    customer_preferences = customer_preferences or {}

    # Xác định danh sách cá đang nuôi và xác định điều kiện
    existing_species = []
    if existing_species_names:
        existing_species = list(
            Species.objects.filter(scientific_name__in=existing_species_names)
        )
    if (temperature is None or ph is None) and existing_species:
        inferred = infer_environment_from_existing_species(existing_species)
        if inferred is not None:
            inferred_temp, inferred_ph = inferred
            if temperature is None:
                temperature = inferred_temp
            if ph is None:
                ph = inferred_ph

    # Bước 1
    tier1_candidates = filter_by_environment(tank_size, temperature, ph, has_plants)
    # Giữ map id tên loài để enrich rejected_tier2 bằng tên loài mà không cần query lại
    species_name_map = {sp.id: sp.name_vn for sp in tier1_candidates}

    # Bước 2
    candidates, rejected_tier2 = filter_by_compatibility(tier1_candidates, existing_species)
    rejected_details = [
        {"id": species_id, "name": species_name_map.get(species_id), "reasons": reasons}
        for species_id, reasons in rejected_tier2.items()
    ]
    #Bước 3
    numeric_ranges = get_numeric_ranges()
    ranked = rank_candidates(
        candidates,
        customer_preferences,
        DEFAULT_WEIGHTS,
        numeric_ranges,
        top_n=top_n,
    )
    # Bước 4
    species_only = [
        species
        for species, score, product in ranked
    ]
    products_map = get_product_recommendations(species_only)
    results = []
    for species, score, selected_product in ranked:
        related_products = products_map.get(
            species.id,
            []
        )
        results.append(
            {
                "species": species,
                "score": round(score, 4),
                # Product được chọn để tính Gower
                "product": selected_product,
                # Các sản phẩm liên quan để cross-sell
                "products": related_products,
            }
        )
    return {
        "results": results,
        "rejected": rejected_details,
        "steps_applied": {
            "tank_size_filter": tank_size is not None,
            "temperature_filter": temperature is not None,
            "ph_filter": ph is not None,
            "tier2": bool(existing_species),
        },
    }
