# Bước 1 — Loại trừ các loài không phù hợp với điều kiện môi trường của bể.

from aquahomeapp.models import Species, SpeciesFeature

PLANT_DESTROYER_FEATURE = "Phá cây thủy sinh"
def infer_environment_from_existing_species(existing_species_list):
    """
    Suy luận điều kiện môi trường thực tế của bể từ các loài khách đang nuôi
    Cơ sở: nếu các loài này đang sống khỏe trong cùng 1 bể, điều kiện thật
    của bể chắc chắn nằm trong range chịu đựng tất cả các loài đó.
    Trả về điểm giữa của khoảng giao
    """
    if not existing_species_list:
        return None

    temp_low = max(sp.min_temp for sp in existing_species_list)
    temp_high = min(sp.max_temp for sp in existing_species_list)
    ph_low = max(sp.min_ph for sp in existing_species_list)
    ph_high = min(sp.max_ph for sp in existing_species_list)

    #nếu các loài đang nuôi tự mâu thuẫn nhau thì bỏ qua vì không suy luận được
    if temp_low > temp_high or ph_low > ph_high:
        return None
    return (temp_low + temp_high) / 2, (ph_low + ph_high) / 2

def filter_by_environment(tank_size=None, temperature=None, ph=None, has_plants=False):
    """
    tank_size
    temperature  :  khách tự đo hoặc số suy luận từ infer_environment_from_existing_species()
    ph           : tương tự temperature
    has_plants   : bể có trồng cây thủy sinh hay không

    Trả về: list[Species]
    """
    candidates = Species.objects.all()

    if tank_size is not None:
        candidates = candidates.filter(min_tank_size__lte=tank_size)

    if temperature is not None:
        candidates = candidates.filter(min_temp__lte=temperature, max_temp__gte=temperature)

    if ph is not None:
        candidates = candidates.filter(min_ph__lte=ph, max_ph__gte=ph)

    if has_plants:
        plant_destroyer_ids = SpeciesFeature.objects.filter(
            feature__name=PLANT_DESTROYER_FEATURE
        ).values_list("species_id", flat=True)
        candidates = candidates.exclude(id__in=plant_destroyer_ids)

    return list(candidates)