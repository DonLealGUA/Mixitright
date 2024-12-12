import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import CocktailList from "../Components/CocktailList";
import { useNavigate } from "react-router-dom"; 
import "./Styles/Search.css";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();  
  const [cocktails, setCocktails] = useState([]); 
  const [loading, setLoading] = useState(true);   
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (location.state?.response) {
        setCocktails(location.state.response);  
        setSearchTerm(location.state.searchTerm || ""); 
        setLoading(false);
      } else {
        setCocktails([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state?.response]); 

  const handleCocktailClick = (cocktailName) => {
    navigate(`/cocktail/${cocktailName}`);
  };

  if (loading) {
    return <p>Loading cocktails...</p>;
  }

  return (
    <div className="Browse">
      <div className="SearchContent">
        <div className="UpperContent">
          <div className="SpiritsHeader">
            <div className="SpiritsTitle">Results for: {searchTerm}</div> 
            <div className="Decoration">
              <span className="circle"></span>
            </div>
          </div>
        </div>

        <div className="LowerContent">
          <div className="BrowseContent">
            {cocktails.length > 0 ? (
              <CocktailList
                Cocktails={cocktails}
                onCocktailClick={handleCocktailClick} 
              />
            ) : (
              <p>No cocktails found for {searchTerm}. Try searching for something else.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
