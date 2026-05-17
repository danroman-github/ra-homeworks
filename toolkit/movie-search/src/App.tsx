import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router';
import HomePage from './pages/HomePage/HomePage';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import { useAppSelector } from './app/hooks';
import './App.css';

function App() {
  const favoritesCount = useAppSelector((state) => state.favorites.items.length);

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              🎬 MovieSearch
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">
                Search
              </Link>
              <Link to="/favorites" className="nav-link">
                Favorites
                {favoritesCount > 0 && (
                  <span className="favorites-badge">{favoritesCount}</span>
                )}
              </Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>Powered by OMDb API | Movie Search App with Redux Toolkit</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;