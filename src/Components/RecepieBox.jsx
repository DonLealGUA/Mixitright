import React, { useState } from 'react';
import './UI/Styles/RecepieBox.css';

const RecepieBox = ({ ingredientName, ingredientType }) => {
  // State to track whether the item is crossed out
  const [isCrossedOut, setIsCrossedOut] = useState(false);

  // Toggle the crossed-out state when clicked
  const toggleCrossOut = () => {
    setIsCrossedOut(!isCrossedOut);
  };

  return (
    <div className="recepie-box" onClick={toggleCrossOut}>
      <div className="text-container">
        {/* Add a conditional class for crossing out */}
        <span className={`ingredient-type ${isCrossedOut ? 'crossed-out' : ''}`}>
          {ingredientType}
        </span>
        <span className={`ingredient-name ${isCrossedOut ? 'crossed-out' : ''}`}>
          {ingredientName}
        </span>
      </div>
    </div>
  );
};

export default RecepieBox;
