import { useLocation, Link } from 'react-router-dom';

export default function Results() {
  const location = useLocation();
  const { results, userName } = location.state || {};

  if (!results) {
    return (
      <div className="results-page">
        <div className="loading-container">
          <h2 style={{ fontFamily: 'var(--font-display)' }}>No Results Found</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Take the quiz to get your personalized recommendations.</p>
          <Link to="/quiz" className="btn-primary" style={{ marginTop: '1rem' }}>Take the Quiz →</Link>
        </div>
      </div>
    );
  }

  const { zodiacSign, recommendations } = results;

  return (
    <div className="results-page">
      <div className="results-header">
        <h1>Your Gemstone Matches{userName ? `, ${userName}` : ''} ✨</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Based on your cosmic profile, here are your top recommendations</p>
        <div className="results-zodiac">♈ Zodiac Sign: <strong>{zodiacSign}</strong></div>
      </div>

      <div className="results-grid">
        {recommendations.map((gem, i) => (
          <Link to={`/gemstone/${gem.id}`} key={gem.id} className="result-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="result-card-header" style={{ background: `linear-gradient(135deg, ${gem.colorHex}18, ${gem.colorHex}08)` }}>
              <div className="result-rank">{i + 1}</div>
              <div className="match-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '1rem' }}>
                {gem.matchScore}% Match
              </div>
              <div style={{
                width: 80, height: 80, borderRadius: '50%', margin: '0 auto',
                background: `radial-gradient(circle at 35% 35%, ${gem.colorHex}cc, ${gem.colorHex}88, ${gem.colorHex}44)`,
                boxShadow: `0 0 40px ${gem.colorHex}33`
              }} />
            </div>
            <div className="result-card-body">
              <h3>{gem.name}</h3>
              <div className="score">🪐 {gem.planet} • {gem.element} • {gem.color}</div>
              <p>{gem.description}</p>

              <div className="result-properties">
                <div className="result-prop">
                  <span className="result-prop-label">✨ Healing</span>
                  <span className="result-prop-value">{gem.properties.healing}</span>
                </div>
                <div className="result-prop">
                  <span className="result-prop-label">🔮 Spiritual</span>
                  <span className="result-prop-value">{gem.properties.spiritual}</span>
                </div>
                <div className="result-prop">
                  <span className="result-prop-label">💜 Emotional</span>
                  <span className="result-prop-value">{gem.properties.emotional}</span>
                </div>
              </div>

              <div className="result-wearing">
                <h4>📿 Wearing Guide</h4>
                <div className="result-properties">
                  <div className="result-prop">
                    <span className="result-prop-label">Finger</span>
                    <span className="result-prop-value">{gem.wearingInstructions.finger}</span>
                  </div>
                  <div className="result-prop">
                    <span className="result-prop-label">Metal</span>
                    <span className="result-prop-value">{gem.wearingInstructions.metal}</span>
                  </div>
                  <div className="result-prop">
                    <span className="result-prop-label">Day</span>
                    <span className="result-prop-value">{gem.wearingInstructions.day}</span>
                  </div>
                  <div className="result-prop">
                    <span className="result-prop-label">Mantra</span>
                    <span className="result-prop-value">{gem.wearingInstructions.mantra}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/quiz" className="btn-secondary">Retake Quiz</Link>
        <Link to="/catalog" className="btn-primary">Explore Full Catalog →</Link>
      </div>
    </div>
  );
}
