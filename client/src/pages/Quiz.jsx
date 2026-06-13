import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GOALS = [
  { id: 'career', label: '💼 Career Growth', desc: 'Professional success & recognition' },
  { id: 'love', label: '❤️ Love & Relationships', desc: 'Romance, harmony & connection' },
  { id: 'health', label: '🌿 Health & Wellness', desc: 'Physical vitality & healing' },
  { id: 'wealth', label: '💰 Wealth & Prosperity', desc: 'Financial abundance & stability' },
  { id: 'spiritual', label: '🧘 Spiritual Growth', desc: 'Inner peace & enlightenment' },
];

const BUDGETS = [
  { id: 'affordable', label: '💰 Affordable', desc: 'Budget-friendly options' },
  { id: 'mid', label: '💰💰 Mid-Range', desc: 'Balanced quality & price' },
  { id: 'premium', label: '💰💰💰 Premium', desc: 'Top-tier gemstones' },
];

const COLORS = [
  { id: '', label: 'No Preference' },
  { id: 'red', label: '🔴 Red' },
  { id: 'blue', label: '🔵 Blue' },
  { id: 'green', label: '🟢 Green' },
  { id: 'yellow', label: '🟡 Yellow' },
  { id: 'purple', label: '🟣 Purple' },
  { id: 'white', label: '⚪ White' },
  { id: 'pink', label: '🩷 Pink' },
  { id: 'black', label: '⚫ Black' },
  { id: 'brown', label: '🟤 Brown' },
];

export default function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [goals, setGoals] = useState([]);
  const [budget, setBudget] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleGoal = (id) => {
    setGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  };

  const canNext = () => {
    if (step === 0) return name.trim() && dob;
    if (step === 1) return goals.length > 0;
    if (step === 2) return budget;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, dob, goals, budget, colorPreference: color }),
      });
      const data = await res.json();
      if (data.success) {
        navigate('/results', { state: { results: data.data, userName: name } });
      }
    } catch (err) {
      console.error(err);
      alert('Failed to get recommendations. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    // Step 0: Name & DOB
    <div key="step0">
      <div className="quiz-step-label">Step 1 of 4</div>
      <h2 className="quiz-question">Tell us about yourself</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Your Name</label>
          <input className="quiz-input" type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Date of Birth</label>
          <input className="quiz-input" type="date" value={dob} onChange={e => setDob(e.target.value)} />
        </div>
      </div>
    </div>,
    // Step 1: Goals
    <div key="step1">
      <div className="quiz-step-label">Step 2 of 4</div>
      <h2 className="quiz-question">What are your life goals?</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Select one or more areas you'd like to improve</p>
      <div className="quiz-options">
        {GOALS.map(g => (
          <button key={g.id} className={`quiz-option${goals.includes(g.id) ? ' selected' : ''}`} onClick={() => toggleGoal(g.id)}>
            <div style={{ fontWeight: 600 }}>{g.label}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{g.desc}</div>
          </button>
        ))}
      </div>
    </div>,
    // Step 2: Budget
    <div key="step2">
      <div className="quiz-step-label">Step 3 of 4</div>
      <h2 className="quiz-question">What's your budget range?</h2>
      <div className="quiz-options">
        {BUDGETS.map(b => (
          <button key={b.id} className={`quiz-option${budget === b.id ? ' selected' : ''}`} onClick={() => setBudget(b.id)}>
            <div style={{ fontWeight: 600 }}>{b.label}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{b.desc}</div>
          </button>
        ))}
      </div>
    </div>,
    // Step 3: Color
    <div key="step3">
      <div className="quiz-step-label">Step 4 of 4</div>
      <h2 className="quiz-question">Any color preference?</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Optional — helps refine your results</p>
      <div className="quiz-options" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}>
        {COLORS.map(c => (
          <button key={c.id} className={`quiz-option${color === c.id ? ' selected' : ''}`} onClick={() => setColor(c.id)}>
            {c.label}
          </button>
        ))}
      </div>
    </div>,
  ];

  if (loading) {
    return (
      <div className="quiz-page">
        <div className="loading-container">
          <div className="spinner" />
          <div className="loading-text">✨ Analyzing your cosmic profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-progress">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`quiz-progress-dot${i === step ? ' active' : i < step ? ' done' : ''}`} />
          ))}
        </div>
        {steps[step]}
        <div className="quiz-actions">
          {step > 0 ? (
            <button className="btn-secondary" onClick={() => setStep(s => s - 1)}>← Back</button>
          ) : <div />}
          {step < 3 ? (
            <button className="btn-primary" disabled={!canNext()} onClick={() => setStep(s => s + 1)}
              style={{ opacity: canNext() ? 1 : 0.5 }}>
              Next →
            </button>
          ) : (
            <button className="btn-primary" onClick={handleSubmit}>
              Get Recommendations ✨
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
