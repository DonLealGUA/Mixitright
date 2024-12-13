import React from 'react';
import './UI/Styles/CocktailItem.css';

const CocktailItem = ({ CocktailName, Image, onCocktailClick }) => {
    const isLongName = CocktailName.length > 20;

    return (
        <div className="cocktail-box" onClick={() => onCocktailClick(CocktailName)}>
            <div className="cocktailtext-container">
                <img src={Image} alt={Image} />
                <span className={`cocktail-name ${isLongName ? 'long-name' : ''}`}>{CocktailName}</span>
            </div>
        </div>
    );
};

export default CocktailItem;
