import React from 'react';
import './UI/Styles/CocktailItem.css';

const CocktailItem = ({ ingredientName, ingredientType, onCocktailClick }) => {
    return (
        <div className="cocktail-box" onClick={() => onCocktailClick(ingredientName)}>
            <div className="cocktailtext-container">
                <img src={ingredientType} alt={ingredientType} />
                <span className="cocktail-name">{ingredientName}</span>
            </div>
        </div>
    );
};

export default CocktailItem;
