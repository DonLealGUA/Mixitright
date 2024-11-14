import React from "react";
import RecepieBox from "./RecepieBox";

const RecepieList = ({ ingredients }) => {
  return (
    <div>
      {ingredients.map((ingredient, index) => (
        <RecepieBox
          key={index}
          ingredientName={ingredient.name}
          ingredientType={ingredient.type}
        />
      ))}
    </div>
  );
};

export default RecepieList;
