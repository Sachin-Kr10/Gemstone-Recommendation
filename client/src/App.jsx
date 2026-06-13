import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Catalog from './pages/Catalog';
import GemstoneDetail from './pages/GemstoneDetail';
import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/gemstone/:id" element={<GemstoneDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
