# 💎 Gemstone Recommendation App

A full-stack web application that recommends gemstones based on your zodiac sign, life goals, budget, and personal preferences. Built with React, Express.js, and a Python-powered recommendation engine.

---

## ✨ Features

- **Personalized Recommendations** — Get top gemstone matches based on your birth date, life goals, budget & color preference
- **Zodiac-Based Analysis** — Automatic zodiac sign detection from date of birth with astrological gemstone mapping
- **Interactive Quiz** — Beautiful multi-step quiz with animated transitions
- **Gemstone Catalog** — Browse 25+ gemstones with search and filters (zodiac, color, price range)
- **Detailed Gemstone Profiles** — Properties, wearing instructions, planetary associations & more
- **Premium UI** — Dark crystal-themed design with glassmorphism, gradients & micro-animations

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, React Router v6, Vanilla CSS |
| **Backend** | Node.js, Express.js, CORS |
| **Recommendation Engine** | Python 3 (zodiac calculation + weighted scoring algorithm) |
| **Version Control** | Git + GitHub |

---

## 📁 Project Structure

```
├── client/                  # React Frontend (Vite)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level page components
│   │   ├── styles/          # Global CSS
│   │   ├── App.jsx          # Root component with routing
│   │   └── main.jsx         # Entry point
│   └── index.html
├── server/                  # Express Backend
│   ├── data/                # Gemstone JSON database
│   ├── routes/              # API route handlers
│   ├── python/              # Python recommendation engine
│   └── server.js            # Express app entry
├── AI_USAGE.md              # AI usage declaration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Sachin-Kr10/Gemstone-Recommendation.git
cd Gemstone-Recommendation

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Running the Application

```bash
# Terminal 1 — Start the backend (port 5000)
cd server
npm start

# Terminal 2 — Start the frontend (port 5173)
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gemstones` | List all gemstones (supports query filters) |
| GET | `/api/gemstones/:id` | Get a single gemstone by ID |
| POST | `/api/recommend` | Get personalized gemstone recommendations |

### Recommendation Request Body
```json
{
  "name": "Sachin",
  "dob": "1998-03-15",
  "goals": ["career", "health"],
  "budget": "mid",
  "colorPreference": "blue"
}
```

---

## 🧠 Recommendation Algorithm

The Python engine uses a **weighted scoring system**:
1. **Zodiac Match (40%)** — Gemstones associated with the user's zodiac sign score highest
2. **Life Goals (25%)** — Stones aligned with selected goals (career, love, health, wealth, spiritual)
3. **Budget Fit (20%)** — Filters stones within the selected price range
4. **Color Preference (15%)** — Boosts stones matching the preferred color family

---

## 📄 License

This project is for educational and evaluation purposes.
