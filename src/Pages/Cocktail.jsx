import React, { useState, useEffect } from "react";
import "./Styles/Cocktail.css";
import RecepieList from '../Components/RecepieList';
import CocktailItem from '../Components/CocktailItem';
import { fetchMojitoData, fetchMockData } from "../API/mockApi"; 

const Cocktail = () => {
  const [cocktails, setCocktails] = useState([]);
  const [RecomendedCocktails, setRecomendedCocktails] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getMockData = async () => {
      const mockData = await fetchMojitoData();
      const mockDataOfCoktails = await fetchMockData();
      setCocktails(mockData.data);
      setRecomendedCocktails(mockDataOfCoktails.data);
    };

    getMockData();
  }, []);

  useEffect(() => {
    if (cocktails.length > 0) {
      const cocktail = cocktails[0];
      const ingredientNames = cocktail.ingredients?.map(ingredient => ingredient.ingredientName).filter(Boolean);

      const newCategories = [
        { name: cocktail.glassType }, 
        ...cocktail.spiritTypes?.map(spirit => ({ name: spirit })), 
        ...ingredientNames?.map(ingredient => ({ name: ingredient })), 
      ];

      setCategories(newCategories);
    }
  }, [cocktails]);

  return (
    <div className="CocktailBrowse">
      <div className="CocktailContent">
        <div className="ImageCorner">
          <img src={cocktails[0]?.imageUrl} alt={cocktails[0]?.name} />
        </div>

        <div className="RecepieInfo">
          <button className="SaveRecipeButton">Save</button>
          <div className="DisplayInfo">
            <h1 className="CocktailName">{cocktails[0]?.name}</h1>
            <h2 className="CocktailIngreidentAmount">Ingredients: {cocktails[0]?.ingredients?.length}</h2>
            <h2 className="CocktailGlassType">Glass type: {cocktails[0]?.glassType}</h2>
            <div className="CocktailRelated">
              <h2>Related Categories:</h2>
              <div className="CategoryButtons">
                {categories.length > 0 && categories.map((category, index) => (
                  <button key={index} className="CategoryButton">
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="IngredientsContent">
          <div className="TitleContainer">
            <h2 className="IngredientTitle">Ingredients</h2>
          </div>

          <div className="RecipeConent">
            {cocktails[0]?.ingredients?.length > 0 && (
              <RecepieList ingredients={cocktails[0]?.ingredients} />
            )}
          </div>
        </div>

        <div className="RecepieContent">
          <div className="TitleContainer">
            <h2 className="InstructionsTitle">Instructions</h2>
          </div>

          <div className="InstructionsConent">
            {cocktails[0]?.instructions}
          </div>
        </div>
      </div>

      <div className="RecommendedCocktails">
        {RecomendedCocktails?.length > 0 ? (
          RecomendedCocktails.map((ingredient, index) => (
            <CocktailItem 
              key={index}
              CocktailName={ingredient.name}
              Image={ingredient.imageUrl}
            />
          ))
        ) : (
          <p>No recommended cocktails available.</p>
        )}
      </div>
    </div>
  );
};

export default Cocktail;
