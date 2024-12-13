import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Styles/Home.css";
import IngredientList from "../Components/IngredientList";
import { fetchRandom, fetchCocktailAmount,fetchCocktailByExactIngredients,fetchCocktailByPartialIngredients } from "../API/APICalls"; 

const Home = () => {
  const [cocktailTotalAmount, setCocktailTotalAmount] = useState(0);  
  const [selectedOption, setSelectedOption] = useState("yes");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientType, setIngredientType] = useState("ingredient");
  const [ingredients, setIngredients] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [visibleSection, setVisibleSection] = useState("left");

  const navigate = useNavigate();

  useEffect(() => {
    const getCocktailAmount = async () => {
      try {
        const amount = await fetchCocktailAmount(); 
        setCocktailTotalAmount(amount || 0); 
      } catch (error) {
        console.error("Error fetching cocktail amount:", error);
      }
    };
    getCocktailAmount();
  }, []);  

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredientName.trim()) {
      if (ingredientType === "ingredient") {
        setIngredients((prevIngredients) => [
          ...prevIngredients,
          { name: ingredientName, type: "ingredient" },
        ]);
      } else if (ingredientType === "spirit") {
        setIngredients((prevIngredients) => [
          ...prevIngredients,
          { name: ingredientName, type: "spirit" },
        ]);
      }
      setIngredientName(""); 
      setIngredientType("ingredient"); 
      setErrorMessage(""); 
    } else {
      setErrorMessage("Please enter an ingredient or spirit.");
    }
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleRandomCocktail = async () => {
    try {
      const cocktails = await fetchRandom(1); 
      if (cocktails && cocktails.length > 0) {
        const randomCocktail = cocktails[0]; 
        const cocktailName = randomCocktail.name; 
        navigate(`/cocktail/${cocktailName.toLowerCase()}`, { state: { cocktails: cocktails.data } });
      } else {
        console.error("No cocktails returned from fetchRandom.");
      }
    } catch (error) {
      console.error("Error fetching random cocktail:", error);
    }
  };

  const handleMixIngredients = async () => {
    const ingredientNames = ingredients.filter(item => item.type === "ingredient").map(item => item.name);
    const spiritNames = ingredients.filter(item => item.type === "spirit").map(item => item.name);

    console.log(ingredientNames);
    console.log(spiritNames);
  
    try {
      let cocktails;
  
      if (selectedOption === "yes") {
        cocktails = await fetchCocktailByExactIngredients(ingredientNames, spiritNames, 0);
      } else {
        cocktails = await fetchCocktailByPartialIngredients(ingredientNames, spiritNames, 0);
      }

      console.log(cocktails);
  
      if (cocktails && cocktails.length > 0) {
        navigate('/search/homeingredients',  {state: { response: cocktails.data, searchTerm: "Home ingredients"} });
      } else {
        console.error("No cocktails found.");
        alert('No cocktails found');
      }
    } catch (error) {
      console.error("Error fetching cocktails:", error);
    }
  };
  
  return (
    <div className="Home">
      <div className="HomeContent">
        <div className={`left ${visibleSection === "left" ? "active" : ""}`}>
          <h1 className="Title">Welcome to MixItRight</h1>
          <p className="TitleDesc">
            Browse our sortiment of over {cocktailTotalAmount} cocktail recipes.
          </p>
          <p className="NoteText">Note: The website's API is hosted on a free server, which may result in response times exceeding 50 seconds.</p>
          <div className="ButtonContainer">
            <p className="ButtonText">Generate a random cocktail</p>
            <button
              className="RandomCocktailButton"
              onClick={handleRandomCocktail}
            >
              Feel lucky
            </button>
            {visibleSection === "left" && (
              <div className="center-content">
                <p className="HiddenButtonText">Generate a random cocktail</p>
                <button
                  className="big-center-button"
                  onClick={() => setVisibleSection("right")}
                >
                  What Can I Make?
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={`right ${visibleSection === "right" ? "active" : ""}`}>
          <div className="UserInputArea">
            <h2 className="InputAreaTitle">
              Make a cocktail with ingredients you have at home
            </h2>
            <div className="UserIngredientInput">
              <input
                type="Ingedienttext"
                className="IngredientInput"
                placeholder="Enter ingredient or spirit"
                value={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIngredientName(e.target.value);  
                  }
                }}
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
              <button
                className="AddIngredientButton"
                onClick={handleAddIngredient}
              >
                Add
              </button>
            </div>
            <div className="UserChoiceContainer">
              <p>Include only EXACT ingredients?</p>
              <label
                className={`choice-label ${
                  selectedOption === "yes" ? "bigger-text" : ""
                }`}
              >
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
              <label
                className={`choice-label ${
                  selectedOption === "no" ? "bigger-text" : ""
                }`}
              >
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
              <IngredientList
                ingredients={ingredients}
                onDeleteIngredient={handleDeleteIngredient}
              />
            </div>
            <div className="UserInputButtonArea">
            <button
                className="UserIngredientsButton"
                onClick={handleMixIngredients}
              >
                Mix it Together
              </button>
            </div>
          </div>
        </div>
      </div>

      {visibleSection === "right" && (
        <button
          className="small-back-button"
          onClick={() => setVisibleSection("left")}
        >
          Back
        </button>
      )}
    </div>
  );
};

export default Home;
