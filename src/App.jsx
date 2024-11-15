import './App.css';
import React, { useState, useEffect } from 'react';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import Home from './Pages/Home';
import Browse from './Pages/Browse';
import Search from './Pages/Search';
import Cocktail from './Pages/Cocktail';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <Router>
      <AppContent setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </Router>
  );
}

function AppContent({ setCurrentPage, currentPage }) {
  const location = useLocation(); 

  useEffect(() => {
    const path = location.pathname.split('/')[1]; 
    setCurrentPage(path || 'home'); 
  }, [location, setCurrentPage]);

  return (
    <>
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <Routes>
        <Route path="/" element={<Home setCurrentPage={setCurrentPage} />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/search/:item" element={<Search />} />
        <Route path="/cocktail/:id" element={<Cocktail />} />
      </Routes>
      
      {location.pathname !== '/' && <Footer />}
    </>
  );
}

export default App;
