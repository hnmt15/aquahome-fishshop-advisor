# Bước 2 — Kiểm tra khả năng tương thích giữa loài ứng viên và các loài khách hàng đang nuôi.

from aquahomeapp.models import SpeciesFeature
from collections import defaultdict

AGGRESSIVE = "Hung dữ"
SEMI_AGGRESSIVE = "Bán hung dữ"
PEACEFUL = "Ôn hòa"
FIN_NIPPER = "Cắn vây"
LONG_FIN = "Vây dài"
TERRITORIAL = "Có tính lãnh thổ"
LAYER_TOP = "Tầng mặt"
LAYER_MID = "Tầng giữa"
LAYER_BOTTOM = "Tầng đáy"
WATER_LAYERS = {LAYER_TOP, LAYER_MID, LAYER_BOTTOM}

BULLYING_SIZE_RATIO = 1.5 #nguy cơ bị bắt nạt
PREDATION_SIZE_RATIO = 3.0 #nguy cơ bị ăn vì kích thước
MIN_TEMP_OVERLAP = 3.0 # Hai loài cần giao nhau tối thiểu 3 độ C

def get_species_features_bulk(species_list):
    #dict: {species_id: set(feature_name, ...)}
    species_ids = [sp.id for sp in species_list]
    rows = SpeciesFeature.objects.filter(species_id__in=species_ids).values_list(
        "species_id", "feature__name")
    features_map = defaultdict(set)
    for species_id, feature_name in rows:
        features_map[species_id].add(feature_name)
    return features_map

def check_pair(candidate, existing, candidate_features, existing_features):
    """
    Kiểm tra 1 cặp (loài ứng viên, loài đang nuôi).
    Trả về (is_compatible: bool, reasons: list[str]).
    """
    reasons = []

    big = max(candidate.max_length, existing.max_length)
    small = max(min(candidate.max_length, existing.max_length), 0.1)
    size_ratio = big / small
    cand_aggressive = bool(candidate_features & {AGGRESSIVE, SEMI_AGGRESSIVE})
    exist_aggressive = bool(existing_features & {AGGRESSIVE, SEMI_AGGRESSIVE})
    cand_peaceful = PEACEFUL in candidate_features
    exist_peaceful = PEACEFUL in existing_features

    if (cand_aggressive and exist_peaceful) or (exist_aggressive and cand_peaceful):
        if size_ratio >= BULLYING_SIZE_RATIO:
            reasons.append(
                f"Chênh lệch tính cách (hung dữ/ôn hòa) kèm chênh lệch kích "
                f"thước (tỉ lệ ~{size_ratio:.1f} lần) giữa "
                f"{candidate.name_vn} và {existing.name_vn} dễ dẫn đến bắt nạt/rượt đuổi")
    if size_ratio >= PREDATION_SIZE_RATIO:
        reasons.append(
            f"Tỉ lệ kích thước giữa {candidate.name_vn} và {existing.name_vn} vượt "
            f"ngưỡng an toàn (~{size_ratio:.1f} lần) — cá nhỏ có nguy cơ bị ăn "
            f"dù cá lớn không thuộc nhóm hung dữ")
    if (FIN_NIPPER in candidate_features and LONG_FIN in existing_features) or (
            FIN_NIPPER in existing_features and LONG_FIN in candidate_features):
        reasons.append(
            f"Một trong hai loài ({candidate.name_vn} / {existing.name_vn}) có tập "
            f"tính cắn vây, loài còn lại có vây dài dễ bị tổn thương")
    if TERRITORIAL in candidate_features and TERRITORIAL in existing_features:
        cand_layer = candidate_features & WATER_LAYERS
        exist_layer = existing_features & WATER_LAYERS
        if cand_layer & exist_layer:
            reasons.append(
                f"{candidate.name_vn} và {existing.name_vn} đều có tính lãnh thổ và "
                f"sống cùng tầng nước, dễ tranh chấp không gian")

    return (len(reasons) == 0, reasons)


def filter_by_compatibility(candidates, existing_species_list):
    if not existing_species_list:
        return candidates, {}

    features_map = get_species_features_bulk(list(candidates) + list(existing_species_list))
    passed = []
    rejected = {}

    for candidate in candidates:
        candidate_features = features_map[candidate.id]
        all_reasons = []

        for existing in existing_species_list:
            ok, reasons = check_pair(candidate, existing, candidate_features, features_map[existing.id])
            if not ok:
                all_reasons.extend(reasons)
        if all_reasons:
            rejected[candidate.id] = all_reasons
        else:
            passed.append(candidate)

    return passed, rejected



