import React from "react";
import IngredientBox from "./IngredientBox";

const IngredientList = ({ ingredients, onDeleteIngredient }) => {
  return (
    <div>
      {ingredients.map((ingredient, index) => (
        <IngredientBox
          key={index}
          ingredientName={ingredient.name}
          ingredientType={ingredient.type}
          onDelete={() => onDeleteIngredient(index)}
        />
      ))}
    </div>
  );
};

export default IngredientList;
