from decimal import Decimal
from django.core.management.base import BaseCommand
from aquahomeapp.models import Category, Product, Species

class Command(BaseCommand):
    help = "Seed database"

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))

    def get_species(scientific_name):
        try:
            return Species.objects.get(scientific_name=scientific_name)
        except Species.DoesNotExist:
            print(f"Không tìm thấy Species: {scientific_name}, product sẽ để species=None")
            return None

    SPECIES_MAP = {
        "guppy":        get_species("Poecilia reticulata"),
        "molly":        get_species("Poecilia sphenops"),
        "neon":         get_species("Paracheirodon innesi"),
        "serpae":       get_species("Hyphessobrycon eques"),
        "corydoras":    get_species("Corydoras aeneus"),
        "garra":        get_species("Garra flavatra"),
        "discus":       get_species("Symphysodon aequifasciatus"),
        "angelfish":    get_species("Pterophyllum scalare"),
        "ali":          get_species("Labidochromis caeruleus"),
        "jackdempsey":  get_species("Rocio octofasciata"),
        "betta":        get_species("Betta splendens"),
        "tigerbarb":    get_species("Puntigrus tetrazona"),
        "rainbowfish":  get_species("Melanotaenia boesemani"),
    }

    CATEGORIES = {
        "fish": ("Cá", "Các loài cá cảnh nước ngọt."),
        "tank": ("Bể cá", "Bể kính, hồ thủy sinh và bộ set-up đi kèm."),
        "food": ("Thức ăn", "Thức ăn cho cá cảnh."),
        "accessory": ("Phụ kiện", "Máy lọc, máy sưởi, đèn, máy sục khí và phụ kiện khác."),
        "plant": ("Cây thủy sinh", "Cây trồng trong bể, hỗ trợ môi trường sống tự nhiên cho cá."),
    }

    category_objs = {}
    for key, (name, desc) in CATEGORIES.items():
        obj, _ = Category.objects.get_or_create(name=name, defaults={"description": desc})
        category_objs[key] = obj

    PRODUCTS = [
        ("Cá Bảy Màu Koi thường", "fish", 15000,  120, "Cá bảy màu (Poecilia reticulata) dòng Koi.", "guppy"),
        ("Cá Bảy Màu Full Red", "fish", 25000,  60,  "Cá bảy màu (Poecilia reticulata) dòng Full Red", "guppy"),
        ("Cá Bảy Màu Dumbo Red Tail", "fish", 35000,  40,  "Cá bảy màu (Poecilia reticulata) có vây ngực lớn như tai voi (Dumbo)", "guppy"),

        ("Cá Molly Đen", "fish", 20000,  80,  "Molly (Poecilia sphenops) màu đen tuyền", "molly"),
        ("Cá Molly Trắng", "fish", 30000,  35,  "Molly (Poecilia sphenops) màu trắng tinh khiết", "molly"),

        ("Cá Neon Xanh", "fish", 8000,   200, "Neon Tetra (Paracheirodon innesi), lung linh như đèn huỳnh quang", "neon"),
        ("Cá Neon Vua", "fish", 15000,  100, "Biến thể size lớn hơn của Neon Tetra, màu sắc đậm hơn.", "neon"),

        ("Cá Hồng Nhung", "fish", 10000,  90,  "Serpae Tetra (Hyphessobrycon eques), nên nuôi đàn ≥6 con để giảm cắn vây.", "serpae"),

        ("Cá Chuột Đồng (Cory thường)",  "fish", 18000,  70,  "Corydoras aeneus, size 3-4cm, sống tầng đáy.", "corydoras"),
        ("Cá Chuột Bạch Tạng", "fish", 25000,  40,  "Corydoras aeneus dòng Albino, size 3-4cm.", "corydoras"),

        ("Cá Bác Sĩ Panda Garra", "fish", 50000,  25,  "Garra flavatra, cá dọn bể, hiền lành", "garra"),

        ("Cá Dĩa Beo tuyết", "fish", 28000, 15,  "Discus (Symphysodon aequifasciatus) nổi bật với các đốm trắng xen lẫn màu sắc sặc sỡ trên cơ thể, trông giống như hoa văn trên áo lông của báo tuyết.", "discus"),
        ("Cá Dĩa Bồ Câu", "fish", 25000, 10,  "Discus (Symphysodon aequifasciatus) dòng Pigeon Blood. Có bảng màu phong phú như đỏ, vàng, xanh lam.", "discus"),

        ("Cá Thần Tiên Platinum", "fish", 45000,  50,  "Angelfish (Pterophyllum scalare) sở hữu vẻ ngoài lấp lánh với làn da ánh nhũ platinum", "angelfish"),
        ("Cá Thần Tiên Marble", "fish", 60000,  35,  "Angelfish (Pterophyllum scalare) dòng Marble, đặc trưng bởi những vân cẩm thạch đan xen giữa ba màu đen, trắng, và vàng", "angelfish"),

        ("Cá Ali Vàng", "fish", 55000,  30,  "Labidochromis caeruleus dòng Yellow Princess, tính lãnh thổ", "ali"),

        ("Cá Điện Quang", "fish", 100000, 20,  "Rocio octofasciata (Jack Dempsey), màu xanh dương điện tử lộng lẫy kết hợp với những hoa văn đen. Đa số hung dữ", "jackdempsey"),

        ("Cá Betta Vàng", "fish", 50000,  45,  "Betta splendens. Nổi bật với màu vàng tươi sáng. Hung dữ, hiếu chiến", "betta"),
        ("Cá Betta Samurai", "fish", 60000,  60,  "Betta splendens. Điểm nổi bật là các sọc hoặc vằn giống như “áo giáp” của chiến binh samurai. Hiếu chiến như tên", "betta"),
        ("Cá Betta Rồng Đỏ", "fish", 80000, 20,  "Betta splendens dòng Dragon, vảy dày đỏ rực. Betta là dòng hiếu chiến", "betta"),

        ("Cá Xecan (Tiger Barb) thường", "fish", 12000,  100, "Puntigrus tetrazona.", "tigerbarb"),
        ("Cá Xecan Bạch Tạng", "fish", 20000,  50,  "Puntigrus tetrazona dòng Albino.", "tigerbarb"),

        ("Cá Cầu Vồng Boesemani", "fish", 65000,  30,  "Melanotaenia boesemani, nên nuôi theo đàn.", "rainbowfish"),

        ("Bể kính 40x25x30cm",           "tank", 250000, 20,  "Bể kính trơn, dung tích ~30L, phù hợp cá nhỏ/vừa.", None),
        ("Bể kính 60x35x35cm",           "tank", 550000, 15,  "Bể kính trơn, dung tích ~70L, phù hợp Dĩa/Cichlid.", None),
        ("Bể Betta mini 15L có nắp",     "tank", 180000, 30,  "Bể mini kèm nắp đậy, phù hợp nuôi riêng 1 Betta.", None),

        ("Thức ăn dạng viên tổng hợp",   "food", 45000,  100, "Viên nổi tổng hợp cho cá cảnh nước ngọt, hộp 100g.", None),
        ("Trùng chỉ đông lạnh",           "food", 25000,  60,  "Trùn chỉ đông lạnh vỉ 100g, thức ăn tươi giàu đạm.", None),
        ("Thức ăn chuyên Betta",         "food", 55000,  40,  "Viên thức ăn công thức riêng cho Betta, hộp 50g.", None),

        ("Máy lọc mini treo thành",      "accessory", 120000, 25, "Máy lọc treo thành bể, lưu lượng phù hợp bể 20-40L.", None),
        ("Máy sưởi 25W",                 "accessory", 90000,  30, "Máy sưởi tự ngắt, phù hợp bể nhỏ dưới 40L.", None),
        ("Đèn LED thủy sinh 30cm",       "accessory", 150000, 20, "Đèn LED full-spectrum hỗ trợ cây thủy sinh và tôn màu cá.", None),

        ("Rong đuôi chồn",               "plant", 15000, 50, "Cây thủy sinh dễ trồng, tạo nơi trú ẩn cho cá con.", None),
        ("Bèo Nhật",                     "plant", 10000, 80, "Cây nổi, giúp giảm ánh sáng và cung cấp nơi trú ẩn.", None),
    ]

    for name, cat_key, price, qty, desc, species_key in PRODUCTS:
        Product.objects.get_or_create(
            name=name,
            defaults={
                "price": Decimal(str(price)),
                "quantity": qty,
                "description": desc,
                "category": category_objs[cat_key],
                "species": SPECIES_MAP.get(species_key) if species_key else None,
                "is_active": True,
                "image": None,
            },
        )

    print(f"Đã tạo {Category.objects.count()} category và {Product.objects.count()} product.")
