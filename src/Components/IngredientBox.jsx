import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './UI/Styles/IngredientBox.css'

const IngredientBox = ({ ingredientName, ingredientType, onDelete }) => {
    return (
        <div className="ingredient-box">
            <div className="text-container">
                <span className="ingredient-name">{ingredientName}</span>
                <span className="ingredient-type">{ingredientType}</span>
            </div>
            <FaTrash className="trash-icon" onClick={onDelete} />
        </div>
    );
};

export default IngredientBox;
