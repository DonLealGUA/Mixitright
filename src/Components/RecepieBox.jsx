import React, { useState } from 'react';
import './UI/Styles/RecepieBox.css';

const RecepieBox = ({ ingredientName, ingredientquantity }) => {
  const [isCrossedOut, setIsCrossedOut] = useState(false);

  const toggleCrossOut = () => {
    setIsCrossedOut(!isCrossedOut);
  };

  return (
    <div className="recepie-box" onClick={toggleCrossOut}>
      <div className="text-container">
        <span className={`ingredient-quantity ${isCrossedOut ? 'crossed-out' : ''}`}>
          {ingredientquantity}
        </span>
        <span className={`ingredient-name ${isCrossedOut ? 'crossed-out' : ''}`}>
          {ingredientName}
        </span>
      </div>
    </div>
  );
};

export default RecepieBox;
