import React from "react";
import CocktailItem from "./CocktailItem";
import './UI/Styles/CocktailList.css';

const CocktailList = ({ ingredients, onCocktailClick }) => {
  return (
    <div className="cocktail-list">
      {ingredients.map((ingredient, index) => (
        <CocktailItem 
          key={index}
          ingredientName={ingredient.name}
          ingredientType={ingredient.type}
          onCocktailClick={onCocktailClick} // Pass click handler
        />
      ))}
    </div>
  );
};

export default CocktailList;
