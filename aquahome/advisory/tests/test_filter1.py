from django.test import TestCase

from aquahomeapp.models import Species, Feature, SpeciesFeature

from advisory.rules.filter1 import (
    infer_environment_from_existing_species,
    filter_by_environment,
)


class InferEnvironmentTest(TestCase):
    def test_empty_species_returns_none(self):
        result = infer_environment_from_existing_species([])

        self.assertIsNone(result)

    def test_infer_environment_from_intersection(self):
        species_1 = Species(
            name_vn="Cá A",
            scientific_name="Species A",
            min_temp=22,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=10,
            min_tank_size=50,
        )

        species_2 = Species(
            name_vn="Cá B",
            scientific_name="Species B",
            min_temp=24,
            max_temp=30,
            min_ph=6.8,
            max_ph=7.8,
            max_length=12,
            min_tank_size=50,
        )

        result = infer_environment_from_existing_species(
            [species_1, species_2]
        )

        # Khoảng nhiệt giao nhau: 24 - 28 -> trung điểm 26
        # Khoảng pH giao nhau: 6.8 - 7.5 -> trung điểm 7.15
        self.assertEqual(result, (26.0, 7.15))

    def test_conflicting_temperature_returns_none(self):
        species_1 = Species(
            name_vn="Cá A",
            scientific_name="Species A",
            min_temp=22,
            max_temp=24,
            min_ph=6.5,
            max_ph=7.5,
            max_length=10,
            min_tank_size=50,
        )

        species_2 = Species(
            name_vn="Cá B",
            scientific_name="Species B",
            min_temp=26,
            max_temp=30,
            min_ph=6.5,
            max_ph=7.5,
            max_length=10,
            min_tank_size=50,
        )

        result = infer_environment_from_existing_species(
            [species_1, species_2]
        )

        self.assertIsNone(result)

    def test_conflicting_ph_returns_none(self):
        species_1 = Species(
            name_vn="Cá A",
            scientific_name="Species A",
            min_temp=22,
            max_temp=30,
            min_ph=6.0,
            max_ph=6.5,
            max_length=10,
            min_tank_size=50,
        )

        species_2 = Species(
            name_vn="Cá B",
            scientific_name="Species B",
            min_temp=22,
            max_temp=30,
            min_ph=7.0,
            max_ph=8.0,
            max_length=10,
            min_tank_size=50,
        )

        result = infer_environment_from_existing_species(
            [species_1, species_2]
        )

        self.assertIsNone(result)


class FilterByEnvironmentTest(TestCase):
    """Test bộ lọc điều kiện môi trường."""

    @classmethod
    def setUpTestData(cls):
        cls.suitable = Species.objects.create(
            name_vn="Cá phù hợp",
            scientific_name="Test suitable",
            min_temp=24,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=10,
            min_tank_size=50,
        )

        cls.bad_temperature = Species.objects.create(
            name_vn="Cá không phù hợp nhiệt độ",
            scientific_name="Test bad temperature",
            min_temp=30,
            max_temp=32,
            min_ph=6.5,
            max_ph=7.5,
            max_length=10,
            min_tank_size=50,
        )

        cls.bad_ph = Species.objects.create(
            name_vn="Cá không phù hợp pH",
            scientific_name="Test bad ph",
            min_temp=24,
            max_temp=28,
            min_ph=8.0,
            max_ph=9.0,
            max_length=10,
            min_tank_size=50,
        )

        cls.bad_tank = Species.objects.create(
            name_vn="Cá không phù hợp dung tích",
            scientific_name="Test bad tank",
            min_temp=24,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=10,
            min_tank_size=100,
        )

    def test_filter_by_temperature(self):
        result = filter_by_environment(temperature=26)

        self.assertIn(self.suitable, result)
        self.assertNotIn(self.bad_temperature, result)

    def test_filter_by_ph(self):
        result = filter_by_environment(ph=7)

        self.assertIn(self.suitable, result)
        self.assertNotIn(self.bad_ph, result)

    def test_filter_by_tank_size(self):
        result = filter_by_environment(tank_size=60)

        self.assertIn(self.suitable, result)
        self.assertNotIn(self.bad_tank, result)

    def test_boundary_temperature(self):
        # min_temp = 24
        result = filter_by_environment(temperature=24)

        self.assertIn(self.suitable, result)

        # max_temp = 28
        result = filter_by_environment(temperature=28)

        self.assertIn(self.suitable, result)

    def test_boundary_ph(self):
        # min_ph = 6.5
        result = filter_by_environment(ph=6.5)

        self.assertIn(self.suitable, result)

        # max_ph = 7.5
        result = filter_by_environment(ph=7.5)

        self.assertIn(self.suitable, result)

    def test_multiple_environment_conditions(self):
        result = filter_by_environment(
            tank_size=60,
            temperature=26,
            ph=7,
        )

        self.assertIn(self.suitable, result)
        self.assertNotIn(self.bad_temperature, result)
        self.assertNotIn(self.bad_ph, result)
        self.assertNotIn(self.bad_tank, result)

    def test_plant_destroyer_is_excluded(self):
        plant_destroyer = Species.objects.create(
            name_vn="Cá phá cây",
            scientific_name="Test plant destroyer",
            min_temp=24,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=10,
            min_tank_size=50,
        )

        feature = Feature.objects.create(
            name="Phá cây thủy sinh"
        )

        SpeciesFeature.objects.create(
            species=plant_destroyer,
            feature=feature
        )

        result = filter_by_environment(
            temperature=26,
            ph=7,
            has_plants=True,
        )

        self.assertNotIn(plant_destroyer, result)

    def test_plant_destroyer_is_allowed_without_plants(self):
        plant_destroyer = Species.objects.create(
            name_vn="Cá phá cây",
            scientific_name="Test plant destroyer 2",
            min_temp=24,
            max_temp=28,
            min_ph=6.5,
            max_ph=7.5,
            max_length=10,
            min_tank_size=50,
        )

        feature = Feature.objects.create(
            name="Phá cây thủy sinh"
        )

        SpeciesFeature.objects.create(
            species=plant_destroyer,
            feature=feature
        )

        result = filter_by_environment(
            temperature=26,
            ph=7,
            has_plants=False,
        )

        self.assertIn(plant_destroyer, result)