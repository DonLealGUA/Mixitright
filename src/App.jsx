import './App.css';
import React, { useState } from 'react';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import Home from './Pages/Home';
import Browse from './Pages/Browse';
import Search from './Pages/Search';
import Cocktail from './Pages/Cocktail';
import Navbar from './Components/Navbar';

// Importing necessary components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <Router>
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <Routes>
        <Route path="/" element={<Home setCurrentPage={setCurrentPage} />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/search/:item" element={<Search />} />
        <Route path="/cocktail/:id" element={<Cocktail />} />
      </Routes>
    </Router>
  );
}

export default App;
