from django.test import TestCase

from aquahomeapp.models import Species, Feature, SpeciesFeature

from advisory.rules.filter2 import (
    get_species_features_bulk,
    check_pair,
    filter_by_compatibility,
)


class Filter2TestCase(TestCase):

    @classmethod
    def setUpTestData(cls):

        cls.aggressive = Feature.objects.create(name="Hung dữ")
        cls.semi_aggressive = Feature.objects.create(name="Bán hung dữ")
        cls.peaceful = Feature.objects.create(name="Ôn hòa")

        cls.fin_nipper = Feature.objects.create(name="Cắn vây")
        cls.long_fin = Feature.objects.create(name="Vây dài")

        cls.territorial = Feature.objects.create(name="Có tính lãnh thổ")

        cls.top = Feature.objects.create(name="Tầng mặt")
        cls.middle = Feature.objects.create(name="Tầng giữa")
        cls.bottom = Feature.objects.create(name="Tầng đáy")

        cls.peaceful_small = Species.objects.create(
            name_vn="Cá hiền nhỏ",
            scientific_name="Peaceful Small",
            min_temp=24,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=5,
            min_tank_size=30,
        )

        cls.aggressive_large = Species.objects.create(
            name_vn="Cá hung lớn",
            scientific_name="Aggressive Large",
            min_temp=24,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=10,
            min_tank_size=50,
        )

        cls.large_fish = Species.objects.create(
            name_vn="Cá lớn",
            scientific_name="Large Fish",
            min_temp=24,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=20,
            min_tank_size=100,
        )

        cls.small_fish = Species.objects.create(
            name_vn="Cá nhỏ",
            scientific_name="Small Fish",
            min_temp=24,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=5,
            min_tank_size=30,
        )

        cls.fin_nipper_fish = Species.objects.create(
            name_vn="Cá cắn vây",
            scientific_name="Fin Nipper Fish",
            min_temp=24,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=5,
            min_tank_size=30,
        )

        cls.long_fin_fish = Species.objects.create(
            name_vn="Cá vây dài",
            scientific_name="Long Fin Fish",
            min_temp=24,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=5,
            min_tank_size=30,
        )

        cls.territorial_top_1 = Species.objects.create(
            name_vn="Cá lãnh thổ mặt 1",
            scientific_name="Territorial Top 1",
            min_temp=24,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=5,
            min_tank_size=30,
        )

        cls.territorial_top_2 = Species.objects.create(
            name_vn="Cá lãnh thổ mặt 2",
            scientific_name="Territorial Top 2",
            min_temp=24,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=5,
            min_tank_size=30,
        )

        cls.territorial_bottom = Species.objects.create(
            name_vn="Cá lãnh thổ đáy",
            scientific_name="Territorial Bottom",
            min_temp=24,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=5,
            min_tank_size=30,
        )

        SpeciesFeature.objects.create(
            species=cls.peaceful_small,
            feature=cls.peaceful,
        )

        SpeciesFeature.objects.create(
            species=cls.aggressive_large,
            feature=cls.aggressive,
        )

        SpeciesFeature.objects.create(
            species=cls.fin_nipper_fish,
            feature=cls.fin_nipper,
        )

        SpeciesFeature.objects.create(
            species=cls.long_fin_fish,
            feature=cls.long_fin,
        )

        for species in [
            cls.territorial_top_1,
            cls.territorial_top_2,
        ]:
            SpeciesFeature.objects.create(
                species=species,
                feature=cls.territorial,
            )
            SpeciesFeature.objects.create(
                species=species,
                feature=cls.top,
            )

        SpeciesFeature.objects.create(
            species=cls.territorial_bottom,
            feature=cls.territorial,
        )
        SpeciesFeature.objects.create(
            species=cls.territorial_bottom,
            feature=cls.bottom,
        )


    def test_get_species_features_bulk(self):
        result = get_species_features_bulk([
            self.peaceful_small,
            self.aggressive_large,
        ])

        self.assertIn(
            self.peaceful.name,
            result[self.peaceful_small.id]
        )

        self.assertIn(
            self.aggressive.name,
            result[self.aggressive_large.id]
        )

    # =========================================================
    # Nhóm 1 — Tính cách + kích thước
    # =========================================================

    def test_aggressive_large_vs_peaceful_small_incompatible(self):
        candidate_features = {self.aggressive.name}
        existing_features = {self.peaceful.name}

        compatible, reasons = check_pair(
            self.aggressive_large,
            self.peaceful_small,
            candidate_features,
            existing_features,
        )

        self.assertFalse(compatible)
        self.assertTrue(len(reasons) > 0)

    def test_peaceful_vs_peaceful_compatible(self):
        candidate_features = {self.peaceful.name}
        existing_features = {self.peaceful.name}

        compatible, reasons = check_pair(
            self.peaceful_small,
            self.peaceful_small,
            candidate_features,
            existing_features,
        )

        self.assertTrue(compatible)
        self.assertEqual(reasons, [])

    # =========================================================
    # Nhóm 1 — Chênh kích thước
    # =========================================================

    def test_predation_size_ratio_incompatible(self):
        candidate_features = set()
        existing_features = set()

        compatible, reasons = check_pair(
            self.large_fish,
            self.small_fish,
            candidate_features,
            existing_features,
        )

        self.assertFalse(compatible)
        self.assertTrue(len(reasons) > 0)

    def test_size_ratio_below_predation_threshold(self):
        compatible, reasons = check_pair(
            self.aggressive_large,
            self.small_fish,
            set(),
            set(),
        )

        # 10 / 5 = 2 < 3
        self.assertTrue(compatible)
        self.assertEqual(reasons, [])

    # =========================================================
    # Nhóm 2 — Cắn vây / Vây dài
    # =========================================================

    def test_fin_nipper_vs_long_fin_incompatible(self):
        candidate_features = {self.fin_nipper.name}
        existing_features = {self.long_fin.name}

        compatible, reasons = check_pair(
            self.fin_nipper_fish,
            self.long_fin_fish,
            candidate_features,
            existing_features,
        )

        self.assertFalse(compatible)
        self.assertTrue(len(reasons) > 0)

    def test_long_fin_vs_normal_fish_compatible(self):
        candidate_features = {self.long_fin.name}
        existing_features = set()

        compatible, reasons = check_pair(
            self.long_fin_fish,
            self.small_fish,
            candidate_features,
            existing_features,
        )

        self.assertTrue(compatible)
        self.assertEqual(reasons, [])

    # =========================================================
    # Nhóm 3 — Lãnh thổ + cùng tầng nước
    # =========================================================

    def test_territorial_same_layer_incompatible(self):
        candidate_features = {
            self.territorial.name,
            self.top.name,
        }

        existing_features = {
            self.territorial.name,
            self.top.name,
        }

        compatible, reasons = check_pair(
            self.territorial_top_1,
            self.territorial_top_2,
            candidate_features,
            existing_features,
        )

        self.assertFalse(compatible)
        self.assertTrue(len(reasons) > 0)

    def test_territorial_different_layer_compatible(self):
        candidate_features = {
            self.territorial.name,
            self.top.name,
        }

        existing_features = {
            self.territorial.name,
            self.bottom.name,
        }

        compatible, reasons = check_pair(
            self.territorial_top_1,
            self.territorial_bottom,
            candidate_features,
            existing_features,
        )

        self.assertTrue(compatible)
        self.assertEqual(reasons, [])

    # =========================================================
    # Test filter_by_compatibility
    # =========================================================

    def test_no_existing_species_returns_all_candidates(self):
        candidates = [
            self.peaceful_small,
            self.aggressive_large,
        ]

        passed, rejected = filter_by_compatibility(
            candidates,
            [],
        )

        self.assertEqual(passed, candidates)
        self.assertEqual(rejected, {})

    def test_filter_rejects_incompatible_candidate(self):
        candidates = [
            self.aggressive_large,
            self.peaceful_small,
        ]

        passed, rejected = filter_by_compatibility(
            candidates,
            [self.peaceful_small],
        )

        self.assertNotIn(self.aggressive_large, passed)
        self.assertIn(self.aggressive_large.id, rejected)

    def test_filter_keeps_compatible_candidate(self):
        candidates = [
            self.peaceful_small,
        ]

        passed, rejected = filter_by_compatibility(
            candidates,
            [self.peaceful_small],
        )

        self.assertIn(self.peaceful_small, passed)
        self.assertEqual(rejected, {})

    def test_rejected_contains_reasons(self):
        candidates = [self.fin_nipper_fish]

        passed, rejected = filter_by_compatibility(
            candidates,
            [self.long_fin_fish],
        )

        self.assertNotIn(self.fin_nipper_fish, passed)
        self.assertIn(self.fin_nipper_fish.id, rejected)
        self.assertGreater(len(rejected[self.fin_nipper_fish.id]), 0)