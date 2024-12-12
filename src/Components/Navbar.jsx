import React, { useState } from "react";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  fetchCocktailByBrand,
  fetchCocktailBySpiritType,
  fetchCocktailByGlassType,
  fetchCocktailByIngredient,
  fetchCocktailByName,
} from "../API/APICalls";
import "./UI/Styles/Navbar.css";

const Navbar = ({ currentPage }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("cocktails");
  const [cocktails, setCocktails] = useState([]);
  const navigate = useNavigate();

  const categories = {
    Glass: ["Highball", "Martini", "Collins", "Old Fashioned"],
    Spirits: ["Vodka", "Whiskey", "Gin", "Rum"],
    Ingredients: ["Lime", "Mint", "Sugar", "Ice"],
    Brands: ["Zacapa", "Hennessy", "Sourz", "Bacardi", "Aboslut"],
  };

  const categoryOptions = [
    { label: "🍹", value: "cocktails", placeholder: "Search for cocktails..." },
    {
      label: "📋",
      value: "ingredients",
      placeholder: "Search for ingredients...",
    },
    { label: "🍾", value: "spirits", placeholder: "Search for spirits..." },
  ];

  const currentPlaceholder =
    categoryOptions.find((option) => option.value === searchCategory)
      ?.placeholder || "";

  const handlePageChange = (page) => {
    const route = page === "home" ? "/" : `/${page}`;
    navigate(route);
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
  
    try {
      let response;
      let urlSearchTerm = searchTerm.toLowerCase();
  
      switch (searchCategory) {
        case "ingredients":
          response = await fetchCocktailByIngredient(urlSearchTerm, 0);
          break;
        case "spirits":
          response = await fetchCocktailBySpiritType(urlSearchTerm, 0);
          break;
        case "cocktails":
        default:
          response = await fetchCocktailByName(urlSearchTerm, 0);
          break;
      }
  
      if (response && response.data && response.data.length > 0) {
        setCocktails(response.data); 
        navigate(`/search/${encodeURIComponent(searchTerm)}`, {state: { response: response.data },});
      } else {
        alert("No cocktails found for this selection");
      }
    } catch (error) {
      console.error("Error during search:", error);
      alert("Something went wrong with the search.");
    }
  };
  
  
  const handleCategoryItemClick = async (category, item) => {
    try {
      let response;
      if (category === "Brands") {
        response = await fetchCocktailByBrand(item, 0);
      } else if (category === "Spirits") {
        if(item == "Wine"){
          response = await fetchCocktailBySpiritType("Red wine", 0);
        }else if(item == "Tequila"){
           response = await fetchCocktailBySpiritType("Blanco Tequila", 0);
        }else if(item == "Rum"){
           response = await fetchCocktailBySpiritType("Light Rum", 0);
        }else{
           response = await fetchCocktailBySpiritType(item.toLowerCase(), 0);
        }
      } else if (category === "Glass") {
        response = await fetchCocktailByGlassType(item+"Glass", 0);
      } else if (category === "Ingredients") {
        response = await fetchCocktailByIngredient(item, 0);
      }

      const cocktails = response.data;

      if (cocktails && cocktails.length > 0) {
        setCocktails(cocktails);
        navigate(`/search/${encodeURIComponent(item)}`, {state: { response: response.data },
        });
      } else {
        alert("No cocktails found for this selection");
      }
    } catch (error) {
      alert("An error occurred while fetching cocktails");
    }
  };

  return (
    <nav className="bg-[#2E4A42] py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="logodiv flex items-center">
          <button
            onClick={() => handlePageChange("home")}
            className="mixitright-logo text-3xl font-bold hover:opacity-80"
            style={{
              background:
                "linear-gradient(-90deg, rgba(220, 178, 126, 1) 0%, rgba(156, 120, 64, 1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MixItRight
          </button>
        </div>

        {/* Desktop Navbar */}
        <div className="navbar-desktop hidden md:flex items-center custom-spacing text-2xl text-[#F5F3E7]">
          <button
            onClick={() => handlePageChange("home")}
            className={`transition-all duration-300 ${
              currentPage === "home" ? "font-bold text-2xl" : "hover:opacity-80"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handlePageChange("browse")}
            className={`transition-all duration-300 ${
              currentPage === "browse"
                ? "font-bold text-2xl"
                : "hover:opacity-80"
            }`}
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
              <div
                className="absolute top-full mt-2 bg-black text-white shadow-lg rounded-lg py-2 flex left-0 z-50"
                style={{ transform: "translateX(-40%)" }}
              >
                {Object.keys(categories).map((category) => (
                  <div key={category} className="flex-1 px-4">
                    <div className="font-bold pb-2 border-b border-gray-600">
                      {category}
                    </div>
                    <ul className="pt-2">
                      {categories[category].map((item) => (
                        <li key={item}>
                          <button
                            onClick={() =>
                              handleCategoryItemClick(category, item)
                            }
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

        {/* Search Bar */}
        <div className="hidden md:block relative">
          <div className="flex items-center space-x-2">
            {/* Dropdown for category selection */}
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="bg-gray-100 border border-gray-300 text-black px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Search input */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={currentPlaceholder}
              className="searchbar custom-width bg-[#FFFF] text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(); 
                }
              }}
            />

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Burger Menu */}
        <div className="block md:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="burgermenu text-[#F5F3E7] text-3xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#2E4A42] text-[#F5F3E7] px-4 py-6 space-y-4">
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-[#2E4A42] text-[#F5F3E7] px-4 py-6 space-y-4">
              {/* Search Bar */}
              <div className="flex items-center space-x-2">
                {/* Select Dropdown */}
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="bg-gray-100 border border-gray-300 text-black px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Search Input */}
                <div className="relative flex-1">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={currentPlaceholder}
                    className="searchbar custom-width bg-[#FFFF] text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();  
                      }
                    }}
                  />
                  {/* Search Button Inside Input */}
                  <button
                    onClick={handleSearch}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <FaSearch />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Menu Links */}
          <button
            onClick={() => handlePageChange("home")}
            className="block text-xl w-full text-left"
          >
            Home
          </button>
          <button
            onClick={() => handlePageChange("browse")}
            className="block text-xl w-full text-left"
          >
            Browse
          </button>

          {/* Dropdown for Categories */}
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
              <div
                className="absolute top-full mt-3 bg-black text-white shadow-lg rounded-lg py-2 z-50"
                style={{ transform: "translateX(0%)" }}
              >
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {Object.keys(categories).map((category, index) => (
                    <div key={category} className="px-4">
                      <div className="font-bold pb-2 border-b border-gray-600">
                        {category}
                      </div>
                      <ul className="pt-2">
                        {categories[category].map((item) => (
                          <li key={item}>
                            <button
                              onClick={() =>
                                handleCategoryItemClick(category, item)
                              }
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
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
