import pandas as pd
import re

def normalize_max_length(value):
    if value is None:
        return None
    text = str(value).lower()
    numbers = re.findall(r"\d+(?:[.,]\d+)?", text)
    if not numbers:
        return None
    max_value = max(float(n.replace(",", ".")) for n in numbers)
    if '"' in text or "″" in text or "inch" in text:
        max_value *= 2.54
    return round(max_value, 2)


def normalize_tank_size(value):
    if value is None:
        return None
    text = str(value).lower()

    liter_match = re.search(r"(\d+(?:[.,]\d+)?)\s*(?:litres|liters|litre|liter)\b", text)
    if liter_match:
        return round(float(liter_match.group(1).replace(",", ".")), 2)

    gallon_match = re.search(r"(\d+(?:[.,]\d+)?)\s*(?:gallons|gallon|gal)\b", text)
    if gallon_match:
        return round(float(gallon_match.group(1).replace(",", ".")) * 3.78541, 2)

    cm_match = re.search(r"(\d+(?:[.,]\d+)?)\s*x\s*(\d+(?:[.,]\d+)?)\s*x\s*(\d+(?:[.,]\d+)?)\s*cm", text)
    if cm_match:
        l, w, h = (float(g.replace(",", ".")) for g in cm_match.groups())
        return round(l * w * h / 1000, 2)

    inch_match = re.search(
        r'(\d+(?:[.,]\d+)?)\s*[″"]?\s*x\s*(\d+(?:[.,]\d+)?)\s*[″"]?\s*x\s*(\d+(?:[.,]\d+)?)\s*[″"]?', text
    )
    if inch_match:
        l, w, h = (float(g.replace(",", ".")) * 2.54 for g in inch_match.groups())
        return round(l * w * h / 1000, 2)

    return None
df = pd.read_csv("species.csv")

df["max_length"] = df["max_length"].apply(normalize_max_length)
df["min_tank_size"] = df["min_tank_size"].apply(normalize_tank_size)

df["min_temp"] = df["min_temp"].astype(float)
df["max_temp"] = df["max_temp"].astype(float)
df["min_ph"] = df["min_ph"].astype(float)
df["max_ph"] = df["max_ph"].astype(float)
df["description"] = df["description"].fillna("")
df["name_vn"] = df["name_vn"].astype(str)
df["scientific_name"] = df["scientific_name"].astype(str)

df.to_csv("species_normalized.csv", index=False)