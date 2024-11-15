import React from "react";
import RecepieBox from "./RecepieBox";

const RecepieList = ({ ingredients }) => {
  return (
    <div>
      {ingredients.map((ingredient, index) => (
        <RecepieBox
          key={index}
          ingredientName={ingredient.ingredientName || ingredient.spiritTypeName} 
          ingredientquantity={ingredient.quantity}
        />
      ))}
    </div>
  );
};

export default RecepieList;
