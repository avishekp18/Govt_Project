import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppContext } from './context/AppContext';

// Import Components
import Header from './components/Header';
import Footer from './components/Footer';

// Import Pages
import Home from './pages/Home';
import DistrictView from './pages/DistrictView';

function App() {
  const { loading, error } = useContext(AppContext);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {/* Global Loading / Error Messages */}
        {loading && <div className="global-loader">लोड हो रहा है...</div>}
        {error && <div className="global-error">{error}</div>}

        <Routes>
          {/* Route 1: The Home Page */}
          <Route path="/" element={<Home />} />

          {/* Route 2: The District Dashboard Page */}
          {/* :name will be the district (e.g., "Lucknow") */}
          <Route path="/district/:name" element={<DistrictView />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;