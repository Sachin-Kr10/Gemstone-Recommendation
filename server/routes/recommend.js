const express = require('express');
const router = express.Router();
const { execFile } = require('child_process');
const path = require('path');

// POST /api/recommend — Get personalized recommendations
router.post('/', (req, res) => {
  const { name, dob, goals, budget, colorPreference } = req.body;

  if (!dob || !goals || !budget) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: dob, goals, budget'
    });
  }

  const input = JSON.stringify({ name, dob, goals, budget, colorPreference });
  const pythonScript = path.join(__dirname, '..', 'python', 'recommend.py');

  execFile('python', [pythonScript, input], { timeout: 10000 }, (error, stdout, stderr) => {
    if (error) {
      // Fallback: try python3 command
      execFile('python3', [pythonScript, input], { timeout: 10000 }, (error2, stdout2, stderr2) => {
        if (error2) {
          console.error('Python error:', stderr || stderr2);
          // Ultimate fallback: use JS-based recommendation
          try {
            const result = jsRecommend(req.body);
            return res.json({ success: true, data: result });
          } catch (jsErr) {
            return res.status(500).json({
              success: false,
              error: 'Recommendation engine failed'
            });
          }
        }
        try {
          const result = JSON.parse(stdout2);
          res.json({ success: true, data: result });
        } catch (parseErr) {
          res.status(500).json({ success: false, error: 'Failed to parse recommendations' });
        }
      });
      return;
    }

    try {
      const result = JSON.parse(stdout);
      res.json({ success: true, data: result });
    } catch (parseErr) {
      res.status(500).json({ success: false, error: 'Failed to parse recommendations' });
    }
  });
});

// JavaScript fallback recommendation engine
function jsRecommend(input) {
  const fs = require('fs');
  const dataPath = path.join(__dirname, '..', 'data', 'gemstones.json');
  const gemstones = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const { dob, goals, budget, colorPreference } = input;

  // Calculate zodiac sign
  const date = new Date(dob);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const zodiac = getZodiacSign(month, day);

  // Score each gemstone
  const scored = gemstones.map(gem => {
    let score = 0;

    // Zodiac match (40%)
    if (gem.zodiacSigns.map(z => z.toLowerCase()).includes(zodiac.toLowerCase())) {
      score += 40;
    }

    // Goals match (25%)
    if (goals && goals.length > 0) {
      const matchedGoals = goals.filter(g => gem.goals.includes(g.toLowerCase()));
      score += (matchedGoals.length / goals.length) * 25;
    }

    // Budget match (20%)
    if (gem.priceRange === budget) {
      score += 20;
    } else if (
      (budget === 'mid' && gem.priceRange === 'affordable') ||
      (budget === 'premium' && gem.priceRange === 'mid')
    ) {
      score += 10;
    }

    // Color preference (15%)
    if (colorPreference && gem.color.toLowerCase() === colorPreference.toLowerCase()) {
      score += 15;
    }

    return { ...gem, matchScore: Math.round(score) };
  });

  scored.sort((a, b) => b.matchScore - a.matchScore);

  return {
    zodiacSign: zodiac,
    recommendations: scored.slice(0, 3)
  };
}

function getZodiacSign(month, day) {
  const signs = [
    { sign: 'Capricorn', start: [1, 1], end: [1, 19] },
    { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
    { sign: 'Pisces', start: [2, 19], end: [3, 20] },
    { sign: 'Aries', start: [3, 21], end: [4, 19] },
    { sign: 'Taurus', start: [4, 20], end: [5, 20] },
    { sign: 'Gemini', start: [5, 21], end: [6, 20] },
    { sign: 'Cancer', start: [6, 21], end: [7, 22] },
    { sign: 'Leo', start: [7, 23], end: [8, 22] },
    { sign: 'Virgo', start: [8, 23], end: [9, 22] },
    { sign: 'Libra', start: [9, 23], end: [10, 22] },
    { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
    { sign: 'Sagittarius', start: [11, 22], end: [12, 21] },
    { sign: 'Capricorn', start: [12, 22], end: [12, 31] }
  ];

  for (const { sign, start, end } of signs) {
    if (
      (month === start[0] && day >= start[1]) ||
      (month === end[0] && day <= end[1])
    ) {
      return sign;
    }
  }
  return 'Capricorn';
}

module.exports = router;
