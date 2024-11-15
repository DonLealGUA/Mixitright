import React, { useState } from 'react';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import './UI/Styles/Navbar.css';

const Navbar = ({ currentPage }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); 

  const handlePageChange = (page) => {
    const route = page === 'home' ? '/' : `/${page}`;
    navigate(route); 
    setDropdownOpen(false); 
  };

  const categories = {
    Glass: ['Highball', 'Martini', 'Collins', 'Old Fashioned'],
    Spirits: ['Vodka', 'Whiskey', 'Gin', 'Rum'],
    Ingredients: ['Lime', 'Mint', 'Sugar', 'Ice'],
  };

  const handleSearch = () => {
    const query = searchTerm.trim();
    if (query) {
      handlePageChange(`search/${encodeURIComponent(query)}`); 
    }
  };

  const handleCategoryItemClick = (category, item) => {
    handlePageChange(`search/${item}`); 
  };

  return (
    <nav className="bg-[#2E4A42] py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => handlePageChange('home')} 
            className="text-3xl font-bold hover:opacity-80"
            style={{
              background: 'linear-gradient(-90deg, rgba(220, 178, 126, 1) 0%, rgba(156, 120, 64, 1) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            MixItRight
          </button>
        </div>

        <div className="flex items-center space-x-12 text-2xl text-[#F5F3E7]">
          {/* Home */}
          <button
            onClick={() => handlePageChange('home')}
            className={`transition-all duration-300 ${currentPage === 'home' ? 'font-bold text-2xl' : 'hover:opacity-80'}`}
          >
            Home
          </button>

          {/* Browse */}
          <button
            onClick={() => handlePageChange('browse')}
            className={`transition-all duration-300 ${currentPage === 'browse' ? 'font-bold text-2xl' : 'hover:opacity-80'}`}
          >
            Browse
          </button>

          {/* Search Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center transition-all duration-300 hover:opacity-80"
            >
              Search
              <span className="ml-1">
                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 bg-black text-white shadow-lg rounded-lg py-2 w-48">
                {Object.keys(categories).map((category) => (
                  <div key={category} className="mb-2">
                    <div className="font-bold px-4 py-1">{category}</div>
                    <ul>
                      {categories[category].map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => handleCategoryItemClick(category, item)}
                            className="block px-4 py-2 text-left hover:bg-gray-800 transition-colors"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="bg-gray-800 text-[#F5F3E7] px-4 py-2 rounded-lg w-64"
          />
          <button
            onClick={handleSearch}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
