import csv
import os

from django.core.management.base import BaseCommand
from django.conf import settings

from ...models import Species, Feature, SpeciesFeature

class Command(BaseCommand):
    help = "Import toàn bộ dữ liệu Species, Feature, Species-Feature"

    def handle(self, *args, **options):
        csv_dir = os.path.join(settings.BASE_DIR.parent, "crawl_scripts")

        self.stdout.write(self.style.MIGRATE_HEADING("1. Import Species"))
        self.import_species(os.path.join(csv_dir, "species_normalized.csv"))

        self.stdout.write("")
        self.stdout.write(self.style.MIGRATE_HEADING("2. Import Feature"))
        self.import_feature(os.path.join(csv_dir, "feature.csv"))

        self.stdout.write("")
        self.stdout.write(self.style.MIGRATE_HEADING("3. Import Species-Feature"))
        self.import_species_feature(os.path.join(csv_dir, "species_feature.csv"))

    def import_species(self, csv_path):
        if not os.path.exists(csv_path):
            self.stdout.write(self.style.ERROR(f"Không tìm thấy file: {csv_path}"))
            return

        created_count = 0
        updated_count = 0
        error_count = 0

        with open(csv_path, "r", encoding="utf-8-sig", newline="") as file:
            reader = csv.DictReader(file)
            for row in reader:
                try:
                    scientific_name = row["scientific_name"].strip()
                    species, created = Species.objects.update_or_create(
                        scientific_name=scientific_name,
                        defaults={
                            "name_vn": row["name_vn"].strip(),
                            "description": row["description"].strip(),
                            "min_temp": float(row["min_temp"]),
                            "max_temp": float(row["max_temp"]),
                            "min_ph": float(row["min_ph"]),
                            "max_ph": float(row["max_ph"]),
                            "max_length": float(row["max_length"]),
                            "min_tank_size": float(row["min_tank_size"]),
                        },
                    )
                except (KeyError, ValueError) as e:
                    self.stdout.write(self.style.ERROR(f"[!] Lỗi dòng: {row} — {e}"))
                    error_count += 1
                    continue

                if created:
                    created_count += 1
                    self.stdout.write(self.style.SUCCESS(f"[+] Thêm: {species.name_vn}"))
                else:
                    updated_count += 1
                    self.stdout.write(self.style.WARNING(f"Cập nhật: {species.name_vn}"))

        self.stdout.write(
            self.style.SUCCESS(
                f"Species: Thêm mới {created_count}, Cập nhật {updated_count}, Lỗi {error_count}"
            )
        )

    def import_feature(self, csv_path):
        if not os.path.exists(csv_path):
            self.stdout.write(self.style.ERROR(f"Không tìm thấy file: {csv_path}"))
            return

        created_count = 0
        updated_count = 0
        error_count = 0

        with open(csv_path, "r", encoding="utf-8-sig", newline="") as file:
            reader = csv.DictReader(file)
            for row in reader:
                try:
                    name = row["name"].strip()
                    description = row["description"].strip()
                except KeyError as e:
                    self.stdout.write(self.style.ERROR(f"Thiếu cột trong CSV: {e}"))
                    error_count += 1
                    continue

                feature, created = Feature.objects.update_or_create(
                    name=name,
                    defaults={"description": description},
                )

                if created:
                    created_count += 1
                    self.stdout.write(self.style.SUCCESS(f"[+] Thêm: {feature.name}"))
                else:
                    updated_count += 1
                    self.stdout.write(self.style.WARNING(f"Cập nhật: {feature.name}"))

        self.stdout.write(
            self.style.SUCCESS(
                f"Feature: Thêm mới {created_count}, Cập nhật {updated_count}, Lỗi {error_count}"
            )
        )


    def import_species_feature(self, csv_path):
        if not os.path.exists(csv_path):
            self.stdout.write(self.style.ERROR(f"Không tìm thấy file: {csv_path}"))
            return

        created_count = 0
        skipped_count = 0
        error_count = 0

        with open(csv_path, "r", encoding="utf-8-sig", newline="") as file:
            reader = csv.DictReader(file)
            for row in reader:
                scientific_name = row["scientific_name"].strip()
                feature_name = row["feature_name"].strip()

                try:
                    species = Species.objects.get(scientific_name=scientific_name)
                except Species.DoesNotExist:
                    self.stdout.write(
                        self.style.ERROR(f"[!] Không tìm thấy Species: {scientific_name}")
                    )
                    error_count += 1
                    continue

                try:
                    feature = Feature.objects.get(name=feature_name)
                except Feature.DoesNotExist:
                    self.stdout.write(
                        self.style.ERROR(f"[!] Không tìm thấy Feature: {feature_name}")
                    )
                    error_count += 1
                    continue

                obj, created = SpeciesFeature.objects.get_or_create(
                    species=species, feature=feature
                )

                if created:
                    created_count += 1
                    self.stdout.write(
                        self.style.SUCCESS(f"[+] {species.name_vn} — {feature.name}")
                    )
                else:
                    skipped_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Species-Feature: Thêm mới {created_count}, "
                f"Đã tồn tại {skipped_count}, Lỗi {error_count}"
            )
        )