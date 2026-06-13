import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GemstoneCard from '../components/GemstoneCard';

const API = 'http://localhost:5000/api';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch(`${API}/gemstones`)
      .then(r => r.json())
      .then(d => { if (d.success) setFeatured(d.data.slice(0, 6)); })
      .catch(() => {});
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">✨ AI-Powered Gemstone Matching</div>
          <h1 className="hero-title">
            Discover Your <span className="gradient">Perfect Gemstone</span>
          </h1>
          <p className="hero-subtitle">
            Unlock the power of ancient wisdom combined with modern technology.
            Get personalized gemstone recommendations based on your zodiac, goals, and preferences.
          </p>
          <div className="hero-actions">
            <Link to="/quiz" className="btn-primary">Find Your Gemstone →</Link>
            <Link to="/catalog" className="btn-secondary">Explore Catalog</Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="features">
        <div className="section-label">How It Works</div>
        <h2 className="section-title">Three Simple Steps to Your Perfect Gem</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌟</div>
            <h3>Share Your Details</h3>
            <p>Enter your date of birth and we'll identify your zodiac sign. Tell us about your life goals and preferences.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>AI Analysis</h3>
            <p>Our Python-powered engine analyzes zodiac compatibility, planetary alignment, and personal attributes to find your match.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>Get Recommendations</h3>
            <p>Receive your top 3 gemstone matches with detailed properties, wearing instructions, and compatibility scores.</p>
          </div>
        </div>
      </section>

      {/* Featured Gems */}
      {featured.length > 0 && (
        <section className="features">
          <div className="section-label">Collection</div>
          <h2 className="section-title">Featured Gemstones</h2>
          <div className="gem-grid">
            {featured.map(g => <GemstoneCard key={g.id} gemstone={g} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/catalog" className="btn-secondary">View All Gemstones →</Link>
          </div>
        </section>
      )}
    </main>
  );
}
