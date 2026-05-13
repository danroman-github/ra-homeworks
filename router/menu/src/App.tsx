import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './js/Home';
import Drift from './js/Drift';
import TimeAttack from './js/TimeAttack';
import Forza from './js/Forza';
import NotFound from './js/NotFound';

function App() {
  return (
    <div className="app">
      <Menu />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drift" element={<Drift />} />
          <Route path="/timeattack" element={<TimeAttack />} />
          <Route path="/forza" element={<Forza />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;