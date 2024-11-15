import React, { useState } from "react";
import "./Styles/Cocktail.css";
import RecepieList from '../Components/RecepieList';
import CocktailItem from '../Components/CocktailItem'

const Cocktail = () => {
  const [cocktails] = useState([
    { id: 1, name: "Vodka", img: "/Assets/SpiritIcons/Screenshot_5.jpg" },
  ]);

  const [categories] = useState([
    { name: "Vodka", type: "Spirit" },
    { name: "Rum", type: "Spirit" },
    { name: "Gin", type: "Spirit" },
    { name: "Highball", type: "Glass" },
    { name: "Long Glass", type: "Glass" },
    { name: "Brandy", type: "Spirit" },
    { name: "Whiskey", type: "Spirit" },
  ]);

  const [ingredients, setIngredients] = useState([
    { id: 1, name: 'Mojito', type: '/Assets/SpiritIcons/Screenshot_5.jpg' },
    { id: 2, name: 'Mojito', type: '/Assets/SpiritIcons/Screenshot_5.jpg' },
    { id: 3, name: 'Mojito', type: '/Assets/SpiritIcons/Screenshot_5.jpg' },

  ]);

  return (
    <div className="Browse">
      <div className="Content">
        <div className="ImageCorner">
          <img src={cocktails[0].img} alt={cocktails[0].name} />
        </div>

        <div className="RecepieInfo">
          <button className="SaveRecipeButton">Save</button>
          <div className="DisplayInfo">
            <h1 className="CocktailName">Mojito</h1>
            <h2 className="CocktailIngreidentAmount">4 Ingredients</h2>
            <h2 className="CocktailGlassType">Glass type: Highball</h2>
            <div className="CocktailRelated">
              <h2>Related Categories:</h2>
              <div className="CategoryButtons">
                {categories.map((category, index) => (
                  <button key={index} className="CategoryButton">
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="IngredientsContent">
          <div className="TitleContainer">
            <h2 className="IngredientTitle">Ingredients</h2>
          </div>

          <div className="RecipeConent">
            <RecepieList ingredients={ingredients} />
          </div>
        </div>

        <div className="RecepieContent">
          <div className="TitleContainer">
            <h2 className="InstructionsTitle">Instructions</h2>
          </div>

          <div className="InstructionsConent">
            {/* Instructions content */}
          </div>
        </div>
      </div>

      <div className="RecommendedCocktails">
         {ingredients.map((ingredient, index) => (
        <CocktailItem 
          key={index}
          ingredientName={ingredient.name}
          ingredientType={ingredient.type}
        />
      ))}
      </div>
    </div>
  );
};

export default Cocktail;
