import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Styles/Browse.css";
import CocktailList from '../Components/CocktailList';
import { fetchMockData } from "../API/mockApi"; 

const Browse = () => {
  const navigate = useNavigate(); 
  const [Spirits, setSprit] = useState([
    { id: 1, name: "Vodka", img: "/Assets/SpiritIcons/Vodka.png" },
    { id: 2, name: "Rum", img: "/Assets/SpiritIcons/rum.png" },
    { id: 3, name: "Tequila", img: "/Assets/SpiritIcons/tequila.png" },
    { id: 4, name: "Gin", img: "/Assets/SpiritIcons/gin.png" },
    { id: 5, name: "Wine", img: "/Assets/SpiritIcons/Wine-glass.png" },
    { id: 6, name: "Cognac", img: "/Assets/SpiritIcons/cognac.png" },
  ]);

  const [ingredients, setIngredients] = useState([]); 

  useEffect(() => {
    const getMockData = async () => {
      const mockData = await fetchMockData();
      setIngredients(mockData.data); 
    };

    getMockData();
  }, []); 

  const handleSpiritClick = (spirit) => {
    navigate(`/search/${spirit.name.toLowerCase()}`);
  };

  const handleCocktailClick = (cocktailName) => {
    setTimeout(() => {
      navigate(`/cocktail/${cocktailName}`);
    }, 1000);
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
              Cocktails={ingredients}
              onCocktailClick={handleCocktailClick} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
