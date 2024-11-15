import './App.css';
import React, { useState } from 'react';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css'; 
import Home from './Pages/Home'
import Browse from './Pages/Browse';  
import Search from './Pages/Search'
import Cocktail from './Pages/Cocktail'
import Navbar from './Components/Navbar';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderComponent = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />; 
      case 'browse':
        return <Browse/>;
        case 'search':
          return <Search />;
      case 'cocktail':
        return <Cocktail/>;
      default:
        return <Home />;
    }
  };
  
  return (
    <div className="home">
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <div className="content">
        {renderComponent()}
      </div>
    </div>
  );
}

export default App;
