const express = require('express');
const cors = require('cors');
const path = require('path');

const gemstoneRoutes = require('./routes/gemstones');
const recommendRoutes = require('./routes/recommend');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/gemstones', gemstoneRoutes);
app.use('/api/recommend', recommendRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Gemstone Recommendation API is running' });
});

app.listen(PORT, () => {
  console.log(`✨ Server running on http://localhost:${PORT}`);
});
