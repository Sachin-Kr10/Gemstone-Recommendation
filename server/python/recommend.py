#!/usr/bin/env python3
"""
Gemstone Recommendation Engine
Scores gemstones based on zodiac sign, life goals, budget, and color preference.
Uses a weighted scoring algorithm:
  - Zodiac Match: 40%
  - Life Goals: 25%
  - Budget Fit: 20%
  - Color Preference: 15%
"""

import sys
import json
import os
from datetime import datetime


def get_zodiac_sign(dob_str):
    """Calculate zodiac sign from date of birth string (YYYY-MM-DD)."""
    try:
        dob = datetime.strptime(dob_str, "%Y-%m-%d")
    except ValueError:
        return "Unknown"

    month = dob.month
    day = dob.day

    zodiac_dates = [
        ("Capricorn", (1, 1), (1, 19)),
        ("Aquarius", (1, 20), (2, 18)),
        ("Pisces", (2, 19), (3, 20)),
        ("Aries", (3, 21), (4, 19)),
        ("Taurus", (4, 20), (5, 20)),
        ("Gemini", (5, 21), (6, 20)),
        ("Cancer", (6, 21), (7, 22)),
        ("Leo", (7, 23), (8, 22)),
        ("Virgo", (8, 23), (9, 22)),
        ("Libra", (9, 23), (10, 22)),
        ("Scorpio", (10, 23), (11, 21)),
        ("Sagittarius", (11, 22), (12, 21)),
        ("Capricorn", (12, 22), (12, 31)),
    ]

    for sign, (sm, sd), (em, ed) in zodiac_dates:
        if (month == sm and day >= sd) or (month == em and day <= ed):
            return sign

    return "Capricorn"


def score_gemstone(gemstone, zodiac_sign, goals, budget, color_preference):
    """Score a gemstone based on user preferences using weighted criteria."""
    score = 0.0

    # 1. Zodiac Match (40 points max)
    zodiac_signs_lower = [z.lower() for z in gemstone.get("zodiacSigns", [])]
    if zodiac_sign.lower() in zodiac_signs_lower:
        score += 40.0

    # 2. Life Goals Match (25 points max)
    gem_goals = [g.lower() for g in gemstone.get("goals", [])]
    if goals:
        user_goals = [g.lower() for g in goals]
        matched = sum(1 for g in user_goals if g in gem_goals)
        if len(user_goals) > 0:
            score += (matched / len(user_goals)) * 25.0

    # 3. Budget Match (20 points max)
    gem_price = gemstone.get("priceRange", "").lower()
    budget_lower = budget.lower() if budget else ""
    if gem_price == budget_lower:
        score += 20.0
    elif (budget_lower == "mid" and gem_price == "affordable") or \
         (budget_lower == "premium" and gem_price == "mid"):
        score += 10.0
    elif budget_lower == "premium" and gem_price == "affordable":
        score += 5.0

    # 4. Color Preference (15 points max)
    if color_preference:
        gem_color = gemstone.get("color", "").lower()
        pref_lower = color_preference.lower()
        if gem_color == pref_lower:
            score += 15.0
        # Partial match for similar colors
        color_families = {
            "red": ["red", "pink", "brown"],
            "blue": ["blue", "purple"],
            "green": ["green"],
            "yellow": ["yellow", "brown"],
            "white": ["white"],
            "purple": ["purple", "blue"],
            "pink": ["pink", "red"],
            "black": ["black", "brown"],
            "brown": ["brown", "yellow", "red"],
        }
        if pref_lower in color_families and gem_color in color_families[pref_lower]:
            score += 7.0

    return round(score)


def recommend(input_data):
    """Main recommendation function."""
    # Load gemstone data
    data_path = os.path.join(os.path.dirname(__file__), "..", "data", "gemstones.json")
    with open(data_path, "r", encoding="utf-8") as f:
        gemstones = json.load(f)

    # Extract user inputs
    dob = input_data.get("dob", "")
    goals = input_data.get("goals", [])
    budget = input_data.get("budget", "mid")
    color_preference = input_data.get("colorPreference", "")

    # Calculate zodiac sign
    zodiac_sign = get_zodiac_sign(dob)

    # Score all gemstones
    scored = []
    for gem in gemstones:
        gem_score = score_gemstone(gem, zodiac_sign, goals, budget, color_preference)
        gem_copy = dict(gem)
        gem_copy["matchScore"] = gem_score
        scored.append(gem_copy)

    # Sort by score descending
    scored.sort(key=lambda x: x["matchScore"], reverse=True)

    # Return top 3 recommendations
    result = {
        "zodiacSign": zodiac_sign,
        "recommendations": scored[:3]
    }

    return result


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No input provided"}))
        sys.exit(1)

    try:
        input_data = json.loads(sys.argv[1])
        result = recommend(input_data)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
