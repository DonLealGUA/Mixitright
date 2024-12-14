import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Browse.css";
import CocktailList from '../Components/CocktailList';
import { fetchCocktails, fetchCocktailBySpiritType, fetchCocktailByName } from "../API/APICalls";
import Loader from "../Components/Loader";

const Browse = () => {
  const navigate = useNavigate();
  const [Spirits, setSprit] = useState([
    { id: 1, name: "Vodka", img: "/Assets/SpiritIcons/vodka.png" },
    { id: 2, name: "Rum", img: "/Assets/SpiritIcons/rum.png" },
    { id: 3, name: "Tequila", img: "/Assets/SpiritIcons/tequila.png" },
    { id: 4, name: "Gin", img: "/Assets/SpiritIcons/gin.png" },
    { id: 5, name: "Wine", img: "/Assets/SpiritIcons/wine-glass.png" },
    { id: 6, name: "Cognac", img: "/Assets/SpiritIcons/cognac.png" },
  ]);

  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);  
  const [totalPages, setTotalPages] = useState(1);  

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCocktails(currentPage);
      setIngredients(data.data);
      setTotalPages(data.totalPages);  
      setLoading(false);
    };

    getData();
  }, [currentPage]); 

  const handleSpiritClick = async (spirit) => {
    try {
      let response = null;
      if(spirit.name == "Wine"){
        response = await fetchCocktailBySpiritType("Red wine", 0);
      }else if(spirit.name == "Tequila"){
         response = await fetchCocktailBySpiritType("Blanco Tequila", 0);
      }else if(spirit.name == "Rum"){
         response = await fetchCocktailBySpiritType("Light Rum", 0);
      }else{
         response = await fetchCocktailBySpiritType(spirit.name.toLowerCase(), 0);
      }
     
      if (response && response.data && response.data.length > 0) {
        navigate(`/search/${spirit.name}`, { state: { response: response.data, searchTerm: spirit.name } });
      } else {
        alert('No cocktails found for this spirit');
      }
    } catch (error) {
      console.error(error); 
      alert('No cocktails found for this spirit');
    }
  };
  

  const handleCocktailClick = async (cocktailName) => {
    try {
      if (!cocktailName) {
        throw new Error('Invalid cocktail name');
      }

      const formattedName = cocktailName.toLowerCase().replace(/\s+/g, '%20');

      const response = await fetchCocktailByName(formattedName, 0);

      if (!response || !response.data || response.data.length === 0) {
        throw new Error('No cocktails found');
      }
      
      navigate(`/cocktail/${formattedName}`, { state: { cocktails: response.data } });
    } catch (error) {
      console.error(error);
      alert('No cocktails found for this spirit');
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber); 
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    let pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <span
          key={i}
          className={`page-number ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </span>
      );
    }
    return <div className="pagination">{pages}</div>;
  };

  return (
    <div className="Browse">
      <div className="BrowseContent">
        <div className="UpperContent">
          <div className="SpiritsHeader">
            <div className="SpiritsTitle">Browse by Spirits</div>
            <div className="Decoration">
              <span className="circle"></span>
            </div>
          </div>
          <div className="SpiritSelection">
            {Spirits.map((spirit) => (
              <div className="SpiritCard" key={spirit.id} onClick={() => handleSpiritClick(spirit)}>
                <div className="InnerBorder">
                  <img src={spirit.img} alt={spirit.name} />
                  <h2>{spirit.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="LowerContent">
          <div className="ContetHeader">
            <div className="BrowseTitle">Browse our selection</div>
            <div className="Decoration">
              <span className="circle"></span>
            </div>
          </div>

          <div className="BrowseContet">
            {loading ? (
              <Loader />
            ) : (
              <CocktailList
                Cocktails={ingredients}
                onCocktailClick={handleCocktailClick}
              />
            )}
          </div>

          {/* Pagination */}
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default Browse;
