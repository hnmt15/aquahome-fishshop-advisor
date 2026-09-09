from django.test import TestCase

from aquahomeapp.models import Species, Feature, SpeciesFeature, Product, Category

from advisory.rules.scoring import (
    _numeric_similarity,
    _categorical_similarity,
    gower_similarity,
    build_species_profile,
)


class ScoringTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.peaceful = Feature.objects.create(name="Ôn hòa")
        cls.top = Feature.objects.create(name="Tầng mặt")
        cls.category = Category.objects.create(
            name="Cá cảnh"
        )
        cls.species = Species.objects.create(
            name_vn="Cá Bảy Màu",
            scientific_name="Poecilia reticulata",
            min_temp=22,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=6,
            min_tank_size=40,
        )

        SpeciesFeature.objects.create(
            species=cls.species,
            feature=cls.peaceful,
        )

        SpeciesFeature.objects.create(
            species=cls.species,
            feature=cls.top,
        )

        cls.product = Product.objects.create(
            name="Cá Bảy Màu",
            category=cls.category,
            species=cls.species,
            price=100000,
            quantity=10,
        )

    # 1. Kiểm tra độ tương đồng số
    def test_numeric_similarity(self):
        result = _numeric_similarity(100, 100, 200)

        self.assertEqual(result, 1.0)

    # 2. Kiểm tra độ tương đồng thuộc tính phân loại
    def test_categorical_similarity(self):
        result = _categorical_similarity("Ôn hòa", "Ôn hòa")

        self.assertEqual(result, 1.0)

    # 3. Hai thuộc tính phân loại khác nhau
    def test_categorical_similarity_different(self):
        result = _categorical_similarity("Ôn hòa", "Hung dữ")

        self.assertEqual(result, 0.0)

    # 4. Kiểm tra Gower Similarity
    def test_gower_similarity(self):
        customer_profile = {
            "price": 100000,
            "max_length": 6,
            "temperament": "Ôn hòa",
        }

        species_profile = {
            "price": 100000,
            "max_length": 6,
            "temperament": "Ôn hòa",
        }

        weights = {
            "price": 0.3,
            "max_length": 0.2,
            "temperament": 0.5,
        }

        numeric_ranges = {
            "price": 500000,
            "max_length": 20,
        }

        result = gower_similarity(
            customer_profile,
            species_profile,
            weights,
            numeric_ranges,
        )

        self.assertEqual(result, 1.0)

    # 5. Kiểm tra xây dựng hồ sơ loài
    def test_build_species_profile(self):
        features_map = {
            self.species.id: {
                "temperament": "Ôn hòa",
                "layer": "Tầng mặt",
                "social": None,
            }
        }

        products_map = {
            self.species.id: [self.product]
        }

        result = build_species_profile(
            self.species,
            customer_profile={},
            features_map=features_map,
            products_map=products_map,
        )

        self.assertEqual(result["max_length"], 6)
        self.assertEqual(result["temperament"], "Ôn hòa")
        self.assertEqual(result["layer"], "Tầng mặt")
        self.assertEqual(result["price"], 100000.0)