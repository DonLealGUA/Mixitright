import React from 'react';
import './UI/Styles/CocktailItem.css';

const CocktailItem = ({ CocktailName, Image, onCocktailClick }) => {
    return (
        <div className="cocktail-box" onClick={() => onCocktailClick(CocktailName)}>
            <div className="cocktailtext-container">
                <img src={Image} alt={Image} />
                <span className="cocktail-name">{CocktailName}</span>
            </div>
        </div>
    );
};

export default CocktailItem;
