import { Link } from 'react-router-dom';

export default function GemstoneCard({ gemstone, showMatch }) {
  return (
    <Link to={`/gemstone/${gemstone.id}`} className="gem-card" style={{ textDecoration: 'none' }}>
      <div className="gem-card-image" style={{ background: `linear-gradient(135deg, ${gemstone.colorHex}22, ${gemstone.colorHex}08)` }}>
        {showMatch && gemstone.matchScore !== undefined && (
          <div className="match-badge">{gemstone.matchScore}% Match</div>
        )}
        <div className="gem-color-display" style={{
          background: `radial-gradient(circle at 35% 35%, ${gemstone.colorHex}cc, ${gemstone.colorHex}88, ${gemstone.colorHex}44)`,
          boxShadow: `0 0 40px ${gemstone.colorHex}33`
        }} />
      </div>
      <div className="gem-card-body">
        <h3>{gemstone.name}</h3>
        <div className="gem-planet">🪐 {gemstone.planet} • {gemstone.element}</div>
        <p>{gemstone.description}</p>
        <div className="gem-tags">
          {gemstone.zodiacSigns.slice(0, 3).map(z => (
            <span className="gem-tag" key={z}>{z}</span>
          ))}
          <span className="gem-tag" style={{ color: 'var(--gold)' }}>
            {gemstone.priceRange === 'affordable' ? '💰' : gemstone.priceRange === 'mid' ? '💰💰' : '💰💰💰'}
          </span>
        </div>
      </div>
    </Link>
  );
}
