import React, { useState } from "react";
import "./Styles/Home.css";
import IngredientList from "../Components/IngredientList";

const Home = () => {
  const cocktailTotalAmount = 100;
  const [selectedOption, setSelectedOption] = useState("yes");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientType, setIngredientType] = useState("ingredient");
  const [ingredients, setIngredients] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredientName.trim()) {
      // Add the new ingredient to the list
      setIngredients([...ingredients, { name: ingredientName, type: ingredientType }]);
      // Clear input fields after adding
      setIngredientName("");
      setIngredientType("ingredient");
      // Clear error message if any
      setErrorMessage("");
    } else {
      // Set error message if the input field is empty
      setErrorMessage("Please enter an ingredient or spirit.");
    }
  };

  return (
    <div className="Home">
      <div className="Content">
        <div className="left">
          <h1 className="Title">Welcome to MixItRight</h1>
          <p className="TitleDesc">
            Browse our sortiment of over {cocktailTotalAmount} cocktail recipes.
          </p>
          <div className="ButtonContainer">
            <p className="ButtonText">Generate a random cocktail</p>
            <button className="RandomCocktailButton">Feel lucky</button>
          </div>
        </div>

        <div className="right">
          <div className="UserInputArea">
            <h2 className="InputAreaTitle">
              Make a cocktail with ingredients you have at home
            </h2>
            <div className="UserIngredientInput">
              <input
                type="text"
                className="IngredientInput"
                placeholder="Enter ingredient or spirit"
                value={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
              />
              <select
                className="ingredientSelect"
                name="ingredientSpirit"
                value={ingredientType}
                onChange={(e) => setIngredientType(e.target.value)}
              >
                <option value="ingredient">Ingredient</option>
                <option value="spirit">Spirit</option>
              </select>
              <button className="AddIngredientButton" onClick={handleAddIngredient}>
                Add
              </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="UserChoiceContainer">
              <p>Include only EXACT ingredients?</p>
              <label className={`choice-label ${selectedOption === "yes" ? "bigger-text" : ""}`}>
                <input
                  type="radio"
                  name="yesNo"
                  value="yes"
                  checked={selectedOption === "yes"}
                  onChange={handleRadioChange}
                />
                Yes
              </label>
              <span className="SpacewithSlash">/</span>
              <label className={`choice-label ${selectedOption === "no" ? "bigger-text" : ""}`}>
                <input
                  type="radio"
                  name="yesNo"
                  value="no"
                  checked={selectedOption === "no"}
                  onChange={handleRadioChange}
                />
                No
              </label>
            </div>

            <div className="UserIngredientShowArea">
              {/* Pass the ingredients to IngredientList */}
              <IngredientList ingredients={ingredients} />
            </div>
            <div className="UserInputButtonArea">
              <button className="UserIngredientsButton">Mix it Together</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
