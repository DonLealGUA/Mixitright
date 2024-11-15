import React from 'react';
import './UI/Styles/CocktailItem.css'

const CocktailItem = ({ ingredientName, ingredientType}) => {
    return (
        <div className="cocktail-box">
            <div className="cocktailtext-container">
                <img src={ingredientType} alt={ingredientType}/>
                <span className="cocktail-name">{ingredientName}</span>
            </div>
          
        </div>
    );
};

export default CocktailItem;
