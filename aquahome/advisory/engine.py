from aquahomeapp.models import Species, Product
from aquahomeapp.models import ProductRecommendation

from .rules.filter1 import filter_by_environment, infer_environment_from_existing_species
from .rules.filter2 import filter_by_compatibility
from .rules.scoring import rank_candidates
from collections import defaultdict
from django.db.models import Max, Min

DEFAULT_WEIGHTS = {
    "price": 0.30,
    "max_length": 0.20,
    "temperament": 0.20,
    "layer": 0.15,
    "social": 0.15,
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
    species_name_map = {sp.id: sp.name_vn for sp in tier1_candidates}

    # Bước 2
    candidates, rejected_tier2 = filter_by_compatibility(tier1_candidates, existing_species)
    rejected_details = [
        {"id": species_id, "name": species_name_map.get(species_id), "reasons": reasons}
        for species_id, reasons in rejected_tier2.items()
    ]
    #Bước 3
    numeric_ranges = get_numeric_ranges()
    has_preferences = bool(customer_preferences)

    if has_preferences:
        ranked = rank_candidates(
            candidates,
            customer_preferences,
            DEFAULT_WEIGHTS,
            numeric_ranges,
            top_n=top_n,
        )
    else:
        ranked = []
        products_map = get_product_recommendations(candidates)
        for species in candidates[:top_n]:
            related_products = products_map.get(species.id, [])

            selected_product = (
                related_products[0].product
                if related_products
                else None
            )
            ranked.append(
                (species, None, selected_product)
            )
    # Bước 4
    results = []

    for species, score, selected_product in ranked:
        results.append({
            "species": {
                "id": species.id,
                "name_vn": species.name_vn,
                "scientific_name": species.scientific_name,
            },
            "product": {
                "id": selected_product.id,
                "name": selected_product.name,
                "price": float(selected_product.price),
                "image": (
                    selected_product.image.url
                    if selected_product.image
                    else None
                ),
            } if selected_product else None,
            "score": round(score, 4) if score is not None else None,
        })
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
