import React, { useState } from "react";
import "./Styles/Browse.css";
import CocktailList from '../Components/CocktailList'

const Browse = () => {
  const [Spirits, setSprit] = useState([
    { id: 1, name: "Vodka", img: "/Assets/SpiritIcons/Vodka.png" },
    { id: 2, name: "Rum", img: "/Assets/SpiritIcons/rum.png" },
    { id: 3, name: "Tequila", img: "/Assets/SpiritIcons/tequila.png" },
    { id: 4, name: "Gin", img: "/Assets/SpiritIcons/gin.png" },
    { id: 5, name: "Wine", img: "/Assets/SpiritIcons/Wine-glass.png" },
    { id: 6, name: "Cognac", img: "/Assets/SpiritIcons/cognac.png" }, // Credits to https://www.flaticon.com/
  ]);

  const [ingredients, setIngredients] = useState([
    { id: 1, name: 'Frozen Pineapple Mango Daiquiri', type: '/Assets/SpiritIcons/Screenshot_5.jpg' },
    { id: 2, name: 'Mojito', type: '/Assets/SpiritIcons/Screenshot_5.jpg' },
    { id: 2, name: 'Mojito', type: '/Assets/SpiritIcons/Screenshot_5.jpg' },
    { id: 2, name: 'Mojito', type: '/Assets/SpiritIcons/Screenshot_5.jpg' },
    { id: 2, name: 'Mojito', type: '/Assets/SpiritIcons/Screenshot_5.jpg' },
    { id: 2, name: 'Mojito', type: '/Assets/SpiritIcons/Screenshot_5.jpg' },
    
    // Add more ingredients as needed
]);
  return (
    <div className="Browse">
      <div className="Content">
        <div className="UpperContent">
          <div class="SpiritsHeader">
            <div class="SpiritsTitle">Browse by Spirits</div>
            <div class="Decoration">
              <span class="circle"></span>
            </div>
          </div>
          <div className="SpiritSelection">
            {Spirits.map((spirit) => (
              <div className="SpiritCard" key={spirit.id}>
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
            <div class="BrowseTitle">Browse our selection</div>
            <div class="Decoration">
              <span class="circle"></span>
            </div>
          </div>

          <div className="BrowseContet">
            <CocktailList ingredients={ingredients} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
