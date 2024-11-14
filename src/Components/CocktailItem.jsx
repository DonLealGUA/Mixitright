import React from 'react';
import './UI/Styles/CocktailItem.css'

const CocktailItem = ({ ingredientName, ingredientType}) => {
    return (
        <div className="ingredient-box">
            <div className="text-container">
                <img src={ingredientType} alt={ingredientType}/>
                <span className="cocktail-name">{ingredientName}</span>
            </div>
          
        </div>
    );
};

export default CocktailItem;
