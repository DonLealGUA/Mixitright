import React from "react";
import CocktailItem from "./CocktailItem";
import './UI/Styles/CocktailList.css';

const CocktailList = ({ Cocktails, onCocktailClick }) => {
  return (
    <div className="cocktail-list">
      {Cocktails.map((Cocktail, index) => (
        <CocktailItem 
          key={index}
          CocktailName={Cocktail.name}
          Image={Cocktail.imageUrl}
          onCocktailClick={onCocktailClick} 
        />
      ))}
    </div>
  );
};

export default CocktailList;
