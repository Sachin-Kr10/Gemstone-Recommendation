import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import GemstoneCard from '../components/GemstoneCard';

const API = 'http://localhost:5000/api';

export default function GemstoneDetail() {
  const { id } = useParams();
  const [gem, setGem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/gemstones/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setGem(d.data);
          // Fetch related gemstones (same zodiac)
          const zodiac = d.data.zodiacSigns[0];
          fetch(`${API}/gemstones?zodiac=${zodiac}`)
            .then(r2 => r2.json())
            .then(d2 => {
              if (d2.success) {
                setRelated(d2.data.filter(g => g.id !== d.data.id).slice(0, 3));
              }
            });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="detail-page">
        <div className="loading-container">
          <div className="spinner" />
          <div className="loading-text">Loading gemstone details...</div>
        </div>
      </div>
    );
  }

  if (!gem) {
    return (
      <div className="detail-page">
        <div className="loading-container">
          <h2>Gemstone not found</h2>
          <Link to="/catalog" className="btn-primary" style={{ marginTop: '1rem' }}>Back to Catalog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Link to="/catalog" className="detail-back">← Back to Catalog</Link>

      <div className="detail-header">
        <div className="detail-gem-visual" style={{ background: `linear-gradient(135deg, ${gem.colorHex}15, ${gem.colorHex}05)` }}>
          <div className="detail-gem-circle" style={{
            background: `radial-gradient(circle at 35% 35%, ${gem.colorHex}cc, ${gem.colorHex}88, ${gem.colorHex}44)`,
            boxShadow: `0 0 60px ${gem.colorHex}33`
          }} />
        </div>
        <div className="detail-info">
          <h1>{gem.name}</h1>
          <div className="detail-meta">
            <span className="detail-meta-item">🪐 Planet: <span>{gem.planet}</span></span>
            <span className="detail-meta-item">🔥 Element: <span>{gem.element}</span></span>
            <span className="detail-meta-item">🎨 Color: <span>{gem.color}</span></span>
            <span className="detail-meta-item">💎 Hardness: <span>{gem.hardness}/10</span></span>
            <span className="detail-meta-item">🧘 Chakra: <span>{gem.chakra}</span></span>
          </div>
          <p className="detail-description">{gem.description}</p>
          <div className="gem-tags" style={{ marginTop: '1rem' }}>
            {gem.zodiacSigns.map(z => <span className="gem-tag" key={z}>♈ {z}</span>)}
            <span className="gem-tag" style={{ color: 'var(--gold)' }}>
              {gem.priceRange === 'affordable' ? '💰 Affordable' : gem.priceRange === 'mid' ? '💰💰 Mid-Range' : '💰💰💰 Premium'}
            </span>
          </div>
        </div>
      </div>

      <div className="detail-sections">
        {/* Properties */}
        <div className="detail-section">
          <h2>✨ Properties</h2>
          <div className="detail-props">
            <div className="detail-prop">
              <span className="detail-prop-label">🌿 Healing</span>
              <span className="detail-prop-value">{gem.properties.healing}</span>
            </div>
            <div className="detail-prop">
              <span className="detail-prop-label">🔮 Spiritual</span>
              <span className="detail-prop-value">{gem.properties.spiritual}</span>
            </div>
            <div className="detail-prop">
              <span className="detail-prop-label">💜 Emotional</span>
              <span className="detail-prop-value">{gem.properties.emotional}</span>
            </div>
          </div>
        </div>

        {/* Wearing Instructions */}
        <div className="detail-section">
          <h2>📿 Wearing Guide</h2>
          <div className="detail-props">
            <div className="detail-prop">
              <span className="detail-prop-label">👆 Finger</span>
              <span className="detail-prop-value">{gem.wearingInstructions.finger}</span>
            </div>
            <div className="detail-prop">
              <span className="detail-prop-label">⚙️ Metal</span>
              <span className="detail-prop-value">{gem.wearingInstructions.metal}</span>
            </div>
            <div className="detail-prop">
              <span className="detail-prop-label">📅 Best Day</span>
              <span className="detail-prop-value">{gem.wearingInstructions.day}</span>
            </div>
            <div className="detail-prop">
              <span className="detail-prop-label">🕉️ Mantra</span>
              <span className="detail-prop-value">{gem.wearingInstructions.mantra}</span>
            </div>
          </div>
        </div>

        {/* Life Goals */}
        <div className="detail-section">
          <h2>🎯 Best For</h2>
          <div className="gem-tags" style={{ gap: '0.6rem' }}>
            {gem.goals.map(g => (
              <span key={g} className="gem-tag" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                {g === 'career' ? '💼' : g === 'love' ? '❤️' : g === 'health' ? '🌿' : g === 'wealth' ? '💰' : '🧘'}{' '}
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Gemstones */}
      {related.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
            Related Gemstones
          </h2>
          <div className="gem-grid">
            {related.map(g => <GemstoneCard key={g.id} gemstone={g} />)}
          </div>
        </div>
      )}
    </div>
  );
}
