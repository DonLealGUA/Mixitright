import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate hook
import "./Styles/Browse.css";
import CocktailList from '../Components/CocktailList';

const Browse = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [Spirits, setSprit] = useState([
    { id: 1, name: "Vodka", img: "/Assets/SpiritIcons/Vodka.png" },
    { id: 2, name: "Rum", img: "/Assets/SpiritIcons/rum.png" },
    { id: 3, name: "Tequila", img: "/Assets/SpiritIcons/tequila.png" },
    { id: 4, name: "Gin", img: "/Assets/SpiritIcons/gin.png" },
    { id: 5, name: "Wine", img: "/Assets/SpiritIcons/Wine-glass.png" },
    { id: 6, name: "Cognac", img: "/Assets/SpiritIcons/cognac.png" },
  ]);

  const [ingredients, setIngredients] = useState([
    { id: 1, name: 'Frozen Pineapple Mango Daiquiri', type: '/Assets/SpiritIcons/Screenshot_5.jpg' },
    { id: 2, name: 'Mojito', type: '/Assets/SpiritIcons/Screenshot_5.jpg' },
    { id: 3, name: 'Mojito', type: '/Assets/SpiritIcons/Screenshot_5.jpg' },
    { id: 4, name: 'Mojito', type: '/Assets/SpiritIcons/Screenshot_5.jpg' },
  ]);

  const handleSpiritClick = (spirit) => {
    // Navigate to the search page for the selected spirit
    navigate(`/search/${spirit.name.toLowerCase()}`);
  };

  const handleCocktailClick = (cocktailName) => {
    // Simulate an API call and then navigate to the cocktail page
    setTimeout(() => {
      navigate(`/cocktail/${cocktailName}`);
    }, 1000); // Simulate a 1-second delay for the "API call"
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

export default Browse;
