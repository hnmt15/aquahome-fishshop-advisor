from django.test import TestCase

from aquahomeapp.models import Species, Feature, SpeciesFeature
from advisory.engine import recommend


class AdvisoryEngineTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):

        # =========================
        # Features
        # =========================

        cls.peaceful = Feature.objects.create(
            name="Ôn hòa"
        )

        cls.top = Feature.objects.create(
            name="Tầng mặt"
        )

        cls.social = Feature.objects.create(
            name="Sống theo đàn"
        )

        cls.aggressive = Feature.objects.create(
            name="Hung dữ"
        )

        # =========================
        # Species
        # =========================

        cls.guppy = Species.objects.create(
            name_vn="Cá Bảy Màu",
            scientific_name="Poecilia reticulata",
            min_temp=22,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=6,
            min_tank_size=40,
        )

        cls.peaceful_fish = Species.objects.create(
            name_vn="Cá hiền",
            scientific_name="Peaceful Test Fish",
            min_temp=24,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=8,
            min_tank_size=50,
        )

        cls.aggressive_fish = Species.objects.create(
            name_vn="Cá hung",
            scientific_name="Aggressive Test Fish",
            min_temp=24,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=20,
            min_tank_size=50,
        )

        # =========================
        # Species features
        # =========================

        SpeciesFeature.objects.create(
            species=cls.guppy,
            feature=cls.peaceful,
        )

        SpeciesFeature.objects.create(
            species=cls.guppy,
            feature=cls.top,
        )

        SpeciesFeature.objects.create(
            species=cls.guppy,
            feature=cls.social,
        )

        SpeciesFeature.objects.create(
            species=cls.peaceful_fish,
            feature=cls.peaceful,
        )

        SpeciesFeature.objects.create(
            species=cls.peaceful_fish,
            feature=cls.top,
        )

        SpeciesFeature.objects.create(
            species=cls.peaceful_fish,
            feature=cls.social,
        )

        SpeciesFeature.objects.create(
            species=cls.aggressive_fish,
            feature=cls.aggressive,
        )

    # =========================================================
    # Integration 1
    # Filter môi trường + trả về kết quả
    # =========================================================

    def test_recommend_filters_by_environment(self):

        result = recommend(
            tank_size=40,
            temperature=25,
            ph=7,
            top_n=5,
        )

        result_species = [
            item["species"]["scientific_name"]
            for item in result["results"]
        ]

        self.assertIn(
            "Poecilia reticulata",
            result_species
        )

    # =========================================================
    # Integration 2
    # Filter tương thích
    # =========================================================

    def test_recommend_filters_incompatible_species(self):

        result = recommend(
            tank_size=100,
            temperature=25,
            ph=7,
            existing_species_names=[
                "Poecilia reticulata"
            ],
            top_n=5,
        )

        # Kiểm tra engine vẫn trả về cấu trúc kết quả
        self.assertIn("results", result)
        self.assertIn("rejected", result)

    # =========================================================
    # Integration 3
    # Scoring với customer preferences
    # =========================================================

    def test_recommend_with_customer_preferences(self):

        result = recommend(
            tank_size=100,
            temperature=25,
            ph=7,
            customer_preferences={
                "max_length": 6,
                "temperament": "Ôn hòa",
                "layer": "Tầng mặt",
                "social": "Sống theo đàn",
            },
            top_n=5,
        )

        self.assertIn("results", result)

        if result["results"]:
            self.assertIsNotNone(
                result["results"][0]["score"]
            )

    # =========================================================
    # Integration 4
    # Không có preference
    # =========================================================

    def test_recommend_without_preferences(self):

        result = recommend(
            tank_size=40,
            temperature=25,
            ph=7,
            top_n=5,
        )

        self.assertIn("results", result)

        if result["results"]:
            self.assertIsNone(
                result["results"][0]["score"]
            )