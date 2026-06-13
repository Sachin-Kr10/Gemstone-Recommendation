# Gemstone Recommendation App — Project Notes

This document provides a summary of the technical design, architectural decisions, core assumptions, and future opportunities for the Gemstone Recommendation App.

---

## 🛠 Tech Stack

The application leverages a lightweight, decoupled full-stack architecture:

- **Frontend**: 
  - **React 18** (scaffolding via Vite) for a fast and reactive component model.
  - **React Router v6** for client-side navigation.
  - **Vanilla CSS** with a custom design system centered on dark mode, glassmorphism, responsive grids, and crystal-themed gradient visuals.
- **Backend**:
  - **Express.js (Node.js)** acting as the API gateway and coordinator.
  - **CORS** middleware enabling cross-origin browser communication.
- **Recommendation Engine**:
  - **Python 3** running a multi-criteria scoring algorithm.
  - **Node.js Child Process (`execFile`)** execution pattern with a **JavaScript fallback mechanism** to ensure 100% service uptime even if Python is missing from the environment.

---

## 🏛 Architecture & Data Flow

1. **API Routing**:
   - `GET /api/gemstones`: Serves the static gemstone database with query parameters for filtering (search, zodiac, color, price).
   - `POST /api/recommend`: Accepts user attributes, invokes the recommendation engine, and returns matched gemstones.
2. **Recommendation Logic**:
   - Scores gemstones using a weighted formula: **Zodiac Alignment (40%)**, **Life Goals (25%)**, **Budget Fit (20%)**, and **Color Preference (15%)**.

---

## 🧠 Assumptions & Trade-offs

- **Zodiac Calculations**: Zodiac sign mapping is based on standard tropical dates (month and day thresholds). No birth time or geographic birth coordinates (Lagna/Ascendant calculation) are requested to keep user onboarding frictionless.
- **Data Persistence**: Gemstone information is maintained inside a structured JSON database (`gemstones.json`). This ensures high read-throughput and zero external database connection latency.
- **Python Dependency**: The setup assumes standard system installations of `python` or `python3`. A JavaScript fallback function mimics the exact Python calculations, assuring that the API handles traffic seamlessly under any host setup.

---

## 🚀 Future Improvements

1. **True Astrological Charts (Kundali)**:
   - Integrate astronomical calculation APIs (or libraries like `pyswisseph`) to map planets using the user's exact coordinate location and time of birth.
2. **Dynamic Transit Updates**:
   - Recommend wearing or removal based on real-time planetary transits (Gochar) and the user's active planetary periods (Dasha).
3. **Advanced Filtering**:
   - Allow sorting by gemstone hardness, primary chakra alignment, and metal settings.
4. **E-Commerce / Certified Partner Integration**:
   - Direct link-out to certified gemstone vendors or lab certifications to monetize recommendation results.
