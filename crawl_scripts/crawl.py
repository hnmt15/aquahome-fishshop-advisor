import re
import csv
import json
import time
import requests
from bs4 import BeautifulSoup

BASE = "https://www.seriouslyfish.com"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (educational data collection; contact: 2351050175thu@ou.edu.vn)"
}
SPECIES_LIST = [
    {"vn_name": "Cá Bảy Màu", "scientific_name": "Poecilia reticulata", "slug": "poecilia-reticulata"},
    {"vn_name": "Cá Neon", "scientific_name": "Paracheirodon innesi", "slug": "paracheirodon-innesi"},
    {"vn_name": "Cá Chuột", "scientific_name": "Corydoras aeneus", "slug": "corydoras-aeneus"},
    {"vn_name": "Cá Dĩa", "scientific_name": "Symphysodon aequifasciatus", "slug": "symphysodon-aequifasciatus"},
    {"vn_name": "Cá Thần Tiên", "scientific_name": "Pterophyllum scalare", "slug": "pterophyllum-scalare"},
    {"vn_name": "Cá Betta", "scientific_name": "Betta splendens", "slug": "betta-splendens"},
    {"vn_name": "Cá Xecan", "scientific_name": "Puntigrus tetrazona", "slug": "puntigrus-tetrazona"},
    {"vn_name": "Cá Molly", "scientific_name": "Poecilia sphenops", "slug": "poecilia-sphenops"},
    {"vn_name": "Cá Ali", "scientific_name": "Labidochromis caeruleus", "slug": "labidochromis-caeruleus"},
    {"vn_name": "Cá Cầu vồng", "scientific_name": "Melanotaenia boesemani", "slug": "melanotaenia-boesemani"},
    {"vn_name": "Cá Hồng nhung", "scientific_name": "Hyphessobrycon eques", "slug": "hyphessobrycon-eques"},
    {"vn_name": "Cá Bác sĩ Panda Garra", "scientific_name": "Garra flavatra", "slug": "garra-flavatra"},
    {"vn_name": "Cá Điện Quang", "scientific_name": "Rocio octofasciata", "slug": "rocio-octofasciata"},

]

def find_species_url(scientific_name: str) -> str | None:
    try:
        resp = requests.get(
            f"{BASE}/", params={"s": scientific_name}, headers=HEADERS, timeout=15
        )
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "lxml")
        for a in soup.select("a[href*='/species/']"):
            href = a.get("href", "")
            if "/species/" in href and href.rstrip("/").count("/") >= 4:
                return href
    except requests.RequestException:
        pass
    return None

def fetch_species_page(slug: str, scientific_name: str) -> tuple[str, BeautifulSoup] | None:
    direct_url = f"{BASE}/species/{slug}/"
    try:
        resp = requests.get(direct_url, headers=HEADERS, timeout=15)
        if resp.status_code == 200:
            return direct_url, BeautifulSoup(resp.text, "lxml")
    except requests.RequestException:
        pass

    found_url = find_species_url(scientific_name)
    if found_url:
        try:
            resp = requests.get(found_url, headers=HEADERS, timeout=15)
            if resp.status_code == 200:
                return found_url, BeautifulSoup(resp.text, "lxml")
        except requests.RequestException:
            pass

    return None

def parse_temperature(text: str) -> tuple[float | None, float | None]:
    #Lấy nhiệt độ C
    if not text:
        return None, None
    # Tìm khoảng °C (Ví dụ: 27-30°C hoặc 27 - 30 C)
    c_match = re.search(r"(\d+(?:\.\d+)?)\s*[–\-–\sto]+\s*(\d+(?:\.\d+)?)\s*°?\s*C\b", text, re.IGNORECASE)
    if c_match:
        v1, v2 = float(c_match.group(1)), float(c_match.group(2))
        return min(v1, v2), max(v1, v2)

    # Trường hợp chỉ có 1 số độ C
    c_single = re.search(r"(\d+(?:\.\d+)?)\s*°?\s*C\b", text, re.IGNORECASE)
    if c_single:
        val = float(c_single.group(1))
        return val, val

    # Nếu chỉ ghi độ F thì chuyển đổi về C
    f_match = re.search(r"(\d+(?:\.\d+)?)\s*[–\-–\sto]+\s*(\d+(?:\.\d+)?)\s*°?\s*F\b", text, re.IGNORECASE)
    if f_match:
        f1, f2 = float(f_match.group(1)), float(f_match.group(2))
        c1 = round((f1 - 32) * 5 / 9, 1)
        c2 = round((f2 - 32) * 5 / 9, 1)
        return min(c1, c2), max(c1, c2)

    return None, None

def parse_ph(soup: BeautifulSoup) -> tuple[float | None, float | None]:
    water_text = extract_section_text(soup, "water conditions") or extract_section_text(soup, "water chemistry")
    if not water_text:
        spec_box = soup.select_one(".spec_sheet") or soup
        water_text = spec_box.get_text(" ", strip=True)

    if not water_text:
        return None, None

    # Lấy từ vị trí chữ "pH" trở đi
    ph_index = water_text.lower().find("ph")
    target_text = water_text[ph_index:] if ph_index != -1 else water_text

    # Tìm các cặp số dạng "5.0 - 7.0", "6.0 to 8.0"
    pairs = re.findall(r"(\d+(?:\.\d+)?)\s*[–\-—\sto]+\s*(\d+(?:\.\d+)?)", target_text)

    all_nums = []
    if pairs:
        for p1, p2 in pairs:
            all_nums.extend([float(p1), float(p2)])
    else:
        #Nếu chỉ có số đứng lẻ (vd "pH: 7.0")
        raw_nums = re.findall(r"\d+(?:\.\d+)?", target_text)
        all_nums = [float(n) for n in raw_nums]

    # Lọc các số nằm trong thang pH hợp lệ (0.0 - 14.0)
    valid_nums = [n for n in all_nums if 0.0 <= n <= 14.0]

    if not valid_nums:
        return None, None

    return min(valid_nums), max(valid_nums)

def parse_max_length(soup: BeautifulSoup) -> str | None:
    length_text = extract_section_text(soup, "maximum standard length")

    if not length_text:
        spec_box = soup.select_one(".spec_sheet") or soup
        text_all = spec_box.get_text(" ", strip=True)
        match = re.search(r"Maximum Standard Length[^:]*:\s*([^\n\r.]+)", text_all, re.I)
        if match:
            length_text = match.group(1)

    if not length_text:
        return None

    # Nếu dạng dải số mm (Ví dụ: "30 – 40 mm" đổi thành "3.0 - 4.0 cm")
    mm_range_match = re.search(r"(\d+(?:\.\d+)?)\s*[–\-–\sto]+\s*(\d+(?:\.\d+)?)\s*mm\b", length_text, re.I)
    if mm_range_match:
        val1 = float(mm_range_match.group(1)) / 10
        val2 = float(mm_range_match.group(2)) / 10
        return f"{val1:.1f} - {val2:.1f} cm"

    # Trường hợp số đơn mm (Ví dụ: "50 mm" đổi thành "5.0 cm")
    mm_single_match = re.search(r"(\d+(?:\.\d+)?)\s*mm\b", length_text, re.I)
    if mm_single_match:
        val = float(mm_single_match.group(1)) / 10
        return f"{val:.1f} cm"

    # Trường hợp số cm (Ví dụ: "14cm" hoặc "12 - 15 cm")
    cm_match = re.search(r"(\d+(?:\.\d+)?(?:\s*[–\-–\sto]+\s*\d+(?:\.\d+)?)?\s*cm\b)", length_text, re.I)
    if cm_match:
        return cm_match.group(1).strip()

    # 5. Fallback nếu chỉ có câu văn miêu tả: Lấy câu đầu tiên
    sentences = length_text.split(".")
    return sentences[0].strip() if sentences else None


def extract_section_text(soup: BeautifulSoup, title: str) -> str:
    heading = soup.find(lambda tag: tag.name in ("h2", "h3") and title.lower() in tag.get_text().lower())
    if not heading:
        return ""

    texts = []
    for sib in heading.find_next_siblings():
        if sib.name in ("h2", "h3"):
            break
        if sib.name in ("p", "div"):
            text = sib.get_text(" ", strip=True)
            if text:
                texts.append(text)
    return " ".join(texts)


def parse_tank_size(soup: BeautifulSoup) -> str | None:
    size_text = extract_section_text(soup, "aquarium size") or extract_section_text(soup, "tank size")

    if not size_text:
        spec_box = soup.select_one(".spec_sheet") or soup
        text_all = spec_box.get_text(" ", strip=True)
        match = re.search(r"(?:Aquarium Size|Tank Size)[^:]*:\s*([^\n\r.]+)", text_all, re.I)
        if match:
            size_text = match.group(1)

    if not size_text:
        return None

    # Bắt số lít (Ví dụ: "110 litres") và Kích thước cm (Ví dụ: "120cm x 30cm x 30cm")
    litre_match = re.search(r"(\d+(?:\,\d+)?\s*(?:litres|liters|litre|liter|\bL\b))", size_text, re.IGNORECASE)
    cm_match = re.search(r"(\d+\s*cm\s*x\s*\d+\s*cm(?:\s*x\s*\d+\s*cm)?)", size_text, re.IGNORECASE)

    parts = []
    if cm_match:
        parts.append(cm_match.group(1).strip())
    if litre_match:
        parts.append(litre_match.group(1).strip())

    if parts:
        return " – ".join(parts)

    sentences = size_text.split(".")
    return sentences[0].strip() if sentences else None


def parse_species_page(url: str, soup: BeautifulSoup, meta: dict) -> dict:
    # 1. Tên khoa học
    h1 = soup.find("h1")
    scientific_name = meta["scientific_name"]
    if h1:
        italic = h1.find("em") or h1.find("i")
        if italic:
            scientific_name = italic.get_text(" ", strip=True)

    # 2. Description
    habitat = extract_section_text(soup, "habitat")
    behaviour = extract_section_text(soup, "behaviour")
    description_parts = [p for p in [habitat, behaviour] if p]
    description = " ".join(description_parts)[:2000]

    # 3. Spec Sheet (Temperature, pH, Max Length, Tank Size)
    spec_box = soup.select_one(".spec_sheet") or soup.select_one("#left-column") or soup
    spec_text = spec_box.get_text(" ", strip=True)

    temp_match = re.search(r"Temperature\s*:\s*([^\n\r\t]+)", spec_text, re.IGNORECASE)
    min_temp, max_temp = parse_temperature(temp_match.group(1)) if temp_match else (None, None)
    min_ph, max_ph = parse_ph(soup)
    max_length = parse_max_length(soup)
    min_tank_size = parse_tank_size(soup)

    return {
        "name_vn": meta["vn_name"],
        "scientific_name": scientific_name,
        "description": description or None,
        "min_temp": min_temp,
        "max_temp": max_temp,
        "min_ph": min_ph,
        "max_ph": max_ph,
        "max_length": max_length,
        "min_tank_size": min_tank_size,
        "source_url": url,
    }


def main():
    results = []
    for meta in SPECIES_LIST:
        print(f"Đang xử lý: {meta['vn_name']} ({meta['scientific_name']}) ...")
        found = fetch_species_page(meta["slug"], meta["scientific_name"])

        if not found:
            print(f" Không tìm thấy trang cho {meta['scientific_name']}, bỏ qua.")
            results.append({**meta, "error": "not_found"})
            time.sleep(1)
            continue
        url, soup = found
        try:
            record = parse_species_page(url, soup, meta)
            results.append(record)
            print(f"  {url}")
        except Exception as e:
            print(f" Lỗi khi parse {url}: {e}")
            results.append({**meta, "error": str(e)})
        time.sleep(1.5)

    # Export JSON
    with open("species.json", "w", encoding="utf-8-sig") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    # Export CSV
    csv_fields = [
        "name_vn", "scientific_name", "description",
        "min_temp", "max_temp", "min_ph", "max_ph",
        "max_length", "min_tank_size", "source_url",
    ]
    with open("species.csv", "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=csv_fields, extrasaction="ignore")
        writer.writeheader()
        for r in results:
            writer.writerow(r)

    print("\nDONE!")


if __name__ == "__main__":
    main()