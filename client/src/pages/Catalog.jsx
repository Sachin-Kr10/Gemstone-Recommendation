import { useState, useEffect } from 'react';
import GemstoneCard from '../components/GemstoneCard';

const API = 'http://localhost:5000/api';

const ZODIAC_SIGNS = ['', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const COLORS = ['', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'White', 'Pink', 'Black', 'Brown'];
const PRICE_RANGES = ['', 'affordable', 'mid', 'premium'];

export default function Catalog() {
  const [gemstones, setGemstones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchGemstones();
  }, [zodiac, color, price]);

  const fetchGemstones = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (zodiac) params.set('zodiac', zodiac);
      if (color) params.set('color', color);
      if (price) params.set('priceRange', price);
      const res = await fetch(`${API}/gemstones?${params}`);
      const data = await res.json();
      if (data.success) setGemstones(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = search
    ? gemstones.filter(g =>
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.description.toLowerCase().includes(search.toLowerCase()) ||
        g.planet.toLowerCase().includes(search.toLowerCase())
      )
    : gemstones;

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1>💎 Gemstone Catalog</h1>
        <p>Explore our collection of {gemstones.length} gemstones with powerful properties</p>
      </div>

      <div className="catalog-filters">
        <div className="filter-group" style={{ flex: 1 }}>
          <label>Search</label>
          <input className="search-input" type="text" placeholder="Search gemstones..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="filter-group">
          <label>Zodiac</label>
          <select className="filter-select" value={zodiac} onChange={e => setZodiac(e.target.value)}>
            <option value="">All Signs</option>
            {ZODIAC_SIGNS.filter(Boolean).map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Color</label>
          <select className="filter-select" value={color} onChange={e => setColor(e.target.value)}>
            <option value="">All Colors</option>
            {COLORS.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Price Range</label>
          <select className="filter-select" value={price} onChange={e => setPrice(e.target.value)}>
            <option value="">All Prices</option>
            <option value="affordable">💰 Affordable</option>
            <option value="mid">💰💰 Mid-Range</option>
            <option value="premium">💰💰💰 Premium</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner" />
          <div className="loading-text">Loading gemstones...</div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="loading-container">
          <p style={{ color: 'var(--text-secondary)' }}>No gemstones found matching your filters.</p>
        </div>
      ) : (
        <div className="gem-grid">
          {filtered.map(g => <GemstoneCard key={g.id} gemstone={g} />)}
        </div>
      )}
    </div>
  );
}
