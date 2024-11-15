import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CocktailList from "../Components/CocktailList";
import { useNavigate } from "react-router-dom"; 
import "./Styles/Search.css";
import { fetchMockData } from "../API/mockApi"; 

const Search = () => {
  const { item } = useParams();
  const navigate = useNavigate(); 

  const [ingredients, setIngredients] = useState([]); 

  useEffect(() => {
    const getMockData = async () => {
      const mockData = await fetchMockData();
      setIngredients(mockData.data); 
    };

    getMockData();
  }, []); 

  const handleCocktailClick = (cocktailName) => {
    setTimeout(() => {
      navigate(`/cocktail/${cocktailName}`);
    }, 1000); 
  };

  return (
    <div className="Browse">
      <div className="SearchContent">
        <div className="UpperContent">
          <div className="SpiritsHeader">
            <div className="SpiritsTitle">{item.substring(0).toLocaleUpperCase()}</div>
            <div className="Decoration">
              <span className="circle"></span>
            </div>
          </div>
        </div>

        <div className="LowerContent">
          <div className="BrowseContent">
          <CocktailList
              Cocktails={ingredients}
              onCocktailClick={handleCocktailClick} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
