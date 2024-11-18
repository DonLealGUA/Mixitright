import React, { useState } from 'react';
import { FaSearch, FaChevronDown, FaChevronUp, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './UI/Styles/Navbar.css';

const Navbar = ({ currentPage }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    const route = page === 'home' ? '/' : `/${page}`;
    navigate(route);
    setDropdownOpen(false);
    setMenuOpen(false); // Close menu on navigation
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
        {/* Logo */}
        <div className="logodiv flex items-center">
          <button
            onClick={() => handlePageChange('home')}
            className="mixitright-logo  text-3xl font-bold hover:opacity-80"
            style={{
              background: 'linear-gradient(-90deg, rgba(220, 178, 126, 1) 0%, rgba(156, 120, 64, 1) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            MixItRight
          </button>
        </div>

        {/* Desktop Navbar */}
<div className="navbar-desktop hidden md:flex items-center space-x-12 text-2xl text-[#F5F3E7]">
  <button
    onClick={() => handlePageChange('home')}
    className={`transition-all duration-300 ${currentPage === 'home' ? 'font-bold text-2xl' : 'hover:opacity-80'}`}
  >
    Home
  </button>
  <button
    onClick={() => handlePageChange('browse')}
    className={`transition-all duration-300 ${currentPage === 'browse' ? 'font-bold text-2xl' : 'hover:opacity-80'}`}
  >
    Browse
  </button>
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
      <div className="absolute top-full mt-2 bg-black text-white shadow-lg rounded-lg py-2 flex left-0 z-50" style={{ transform: 'translateX(-40%)' }}>
        {Object.keys(categories).map((category) => (
          <div key={category} className="flex-1 px-4">
            <div className="font-bold pb-2 border-b border-gray-600">{category}</div>
            <ul className="pt-2">
              {categories[category].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleCategoryItemClick(category, item)}
                    className="block px-4 py-2 text-left hover:bg-gray-800 transition-colors w-full"
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

        <div className="hidden md:block relative">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search..."
    className="searchbar custom-width bg-white text-[#F5F3E7] px-4 py-2 rounded-lg"
  />
  <button
    onClick={handleSearch}
    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-white"
  >
    <FaSearch />
  </button>
</div>


  {/* Burger Menu */}
  <div className="block md:hidden">
          <button onClick={() => setMenuOpen((prev) => !prev)} className="burgermenu text-[#F5F3E7] text-3xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#2E4A42] text-[#F5F3E7] px-4 py-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="bg-gray-800 text-[#F5F3E7] px-4 py-2 rounded-lg w-full"
            />
            <button
              onClick={handleSearch}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <FaSearch />
            </button>
          </div>

          {/* Menu Links */}
          <button
            onClick={() => handlePageChange('home')}
            className="block text-xl w-full text-left"
          >
            Home
          </button>
          <button
            onClick={() => handlePageChange('browse')}
            className="block text-xl w-full text-left"
          >
            Browse
          </button>

          {/* Dropdown for Categories */}
          <div>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center w-full text-left text-lg font-semibold"
            >
              Search Categories
              <span className="ml-1">{isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
            </button>
            {isDropdownOpen && (
              <div className="pl-4 mt-2">
                {Object.keys(categories).map((category) => (
                  <div key={category} className="mb-4">
                    <div className="font-semibold">{category}</div>
                    <ul className="space-y-1">
                      {categories[category].map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => handleCategoryItemClick(category, item)}
                            className="text-left w-full"
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
      )}
    </nav>
  );
};

export default Navbar;
