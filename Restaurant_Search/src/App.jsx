import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Login from './components/Login';
import OTP from './components/OTP';
import RestaurantsList from './components/RestaurantsList';
import RestaurantDetail from './components/RestaurantDetail';
import logo from './assets/fastor-logo.png';


export default function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/src/sw.js').catch(err => console.log('SW failed', err));
    }
  }, []);

  return (
    <Router>
      <MainRoutes />
    </Router>
  );
}

function MainRoutes() {
  const navigate = useNavigate();
  const [selectedPlace, setSelectedPlace] = useState(null);

  function logout() {
    localStorage.clear();
    navigate('/');
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/restaurants" element={<RestaurantsListPage onLogout={logout} />} />
      <Route path="/restaurant/:id" element={<RestaurantPage />} />
    </Routes>
  );
}

function RestaurantsListPage({ onLogout }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Unified Navbar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-md border-b border-green-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Left side logo */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Fastor Logo"
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-2xl font-semibold text-green-600">Fastor</h1>
          </div>

          {/* Logout button */}
          <button
            onClick={onLogout}
            className="text-green-600 border border-green-500 px-4 py-2 rounded-full hover:bg-green-500 hover:text-white transition font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Restaurant list */}
      <main className="max-w-6xl mx-auto py-8 px-4">
        <RestaurantsList
          onSelect={(p) => navigate(`/restaurant/${p.id}`, { state: p })}
        />
      </main>
    </div>
  );
}



function RestaurantPage() {
  const { id } = useParams();
  const { state } = window.history.state || {};
  const [place, setPlace] = useState(state || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!place) {
      fetch('/restaurants.json')
        .then(r => r.json())
        .then(data => {
          const found = data.find(p => String(p.id) === id);
          setPlace(found);
        });
    }
  }, [id]);

  return place ? (
    <RestaurantDetail place={place} onBack={() => navigate('/restaurants')} />
  ) : (
    <div className="p-6 text-center">Loading...</div>
  );
}