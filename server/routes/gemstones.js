const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '..', 'data', 'gemstones.json');

function loadGemstones() {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

// GET /api/gemstones — List all gemstones with optional filters
router.get('/', (req, res) => {
  try {
    let gemstones = loadGemstones();
    const { zodiac, color, priceRange, search, goal } = req.query;

    if (zodiac) {
      gemstones = gemstones.filter(g =>
        g.zodiacSigns.map(z => z.toLowerCase()).includes(zodiac.toLowerCase())
      );
    }

    if (color) {
      gemstones = gemstones.filter(g =>
        g.color.toLowerCase() === color.toLowerCase()
      );
    }

    if (priceRange) {
      gemstones = gemstones.filter(g =>
        g.priceRange.toLowerCase() === priceRange.toLowerCase()
      );
    }

    if (goal) {
      gemstones = gemstones.filter(g =>
        g.goals.map(gl => gl.toLowerCase()).includes(goal.toLowerCase())
      );
    }

    if (search) {
      const term = search.toLowerCase();
      gemstones = gemstones.filter(g =>
        g.name.toLowerCase().includes(term) ||
        g.description.toLowerCase().includes(term) ||
        g.color.toLowerCase().includes(term)
      );
    }

    res.json({ success: true, count: gemstones.length, data: gemstones });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to load gemstones' });
  }
});

// GET /api/gemstones/:id — Get single gemstone
router.get('/:id', (req, res) => {
  try {
    const gemstones = loadGemstones();
    const gemstone = gemstones.find(g => g.id === parseInt(req.params.id));

    if (!gemstone) {
      return res.status(404).json({ success: false, error: 'Gemstone not found' });
    }

    res.json({ success: true, data: gemstone });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to load gemstone' });
  }
});

module.exports = router;
