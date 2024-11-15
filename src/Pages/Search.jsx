import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CocktailList from "../Components/CocktailList";
import { useNavigate } from "react-router-dom"; // Import navigate hook
import "./Styles/Search.css";

const Search = () => {
  // Extract 'item' from the URL using useParams
  const { item } = useParams();
  const navigate = useNavigate(); // Initialize navigate

  const [ingredients, setIngredients] = useState([
    { id: 1, name: "Frozen Pineapple Mango Daiquiri", type: "/Assets/SpiritIcons/Screenshot_5.jpg" },
    { id: 2, name: "Mojito", type: "/Assets/SpiritIcons/Screenshot_5.jpg" },
    { id: 3, name: "Margarita", type: "/Assets/SpiritIcons/Screenshot_5.jpg" },
    // Add more ingredients as needed
  ]);

  const handleCocktailClick = (cocktailName) => {
    // Simulate an API call and then navigate to the cocktail page
    setTimeout(() => {
      navigate(`/cocktail/${cocktailName}`);
    }, 1000); // Simulate a 1-second delay for the "API call"
  };

  // Alert item to check if the value is passed correctly
  console.log(item);

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
              ingredients={ingredients}
              onCocktailClick={handleCocktailClick} // Pass handler to CocktailList
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
