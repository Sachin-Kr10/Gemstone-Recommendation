import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">💎 <span>GemStone</span></Link>
      <button className="nav-toggle" onClick={() => setOpen(!open)}>
        {open ? '✕' : '☰'}
      </button>
      <ul className={`nav-links${open ? ' open' : ''}`}>
        <li><Link to="/" className={isActive('/')} onClick={() => setOpen(false)}>Home</Link></li>
        <li><Link to="/catalog" className={isActive('/catalog')} onClick={() => setOpen(false)}>Catalog</Link></li>
        <li><Link to="/quiz" className={isActive('/quiz')} onClick={() => setOpen(false)}>Quiz</Link></li>
      </ul>
      <Link to="/quiz" className="nav-cta" style={{ textDecoration: 'none' }}>Find Your Gem ✨</Link>
    </nav>
  );
}
