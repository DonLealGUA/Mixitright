import React, { useState, useEffect } from "react";
import "./Styles/Cocktail.css";
import RecepieList from '../Components/RecepieList';
import CocktailItem from '../Components/CocktailItem';
import { fetchCocktailByName, fetchRandom, fetchCocktailByGlassType, fetchCocktailByIngredient, fetchCocktailBySpiritType } from "../API/APICalls"; 
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "../Components/Loader"; 

const Cocktail = () => {
  const [cocktails, setCocktails] = useState([]);
  const [RecomendedCocktails, setRecomendedCocktails] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();  
  const { cocktailName } = useParams();

  useEffect(() => {
    if (cocktailName) {
      const getCocktailData = async () => {
        try {
          setLoading(true); 
          const cocktailResponse = await fetchCocktailByName(cocktailName, 0);
          setCocktails(cocktailResponse.data); 
        } catch (error) {
          console.error("Error fetching cocktail:", error);
        } finally {
          setLoading(false); 
        }
      };
      getCocktailData();
    }
  }, [cocktailName]);

  useEffect(() => {
    let isMounted = true;
  
    const getRecommendedCocktails = async () => {
      try {
        const randomCocktailsResponse = await fetchRandom(4);
  
        if (isMounted) {
          setRecomendedCocktails([...randomCocktailsResponse]);
        }
      } catch (error) {
        console.error("Error fetching recommended cocktails:", error);
      }
    };
  
    getRecommendedCocktails();
  
    return () => {
      isMounted = false; 
    };
  }, []);


  useEffect(() => {
    if (cocktails.length > 0) {
      const cocktail = cocktails[0];
      const ingredientNames = cocktail.ingredients?.map(ingredient => ingredient.ingredientName).filter(Boolean);

      const newCategories = [
        { name: cocktail.glassType, type: "glass" },
        ...cocktail.spiritTypes?.map(spirit => ({ name: spirit, type: "spirit" })),
        ...ingredientNames?.map(ingredient => ({ name: ingredient, type: "ingredient" })),
      ];

      setCategories(newCategories); 
    }
  }, [cocktails]);

  const handleCocktailClick = async (category) => {
    try {
      if (!category.name) {
        throw new Error('Invalid category');
      }

      let response;
      if (category.type === "glass") {
        response = await fetchCocktailByGlassType(category.name, 0);
      } else if (category.type === "ingredient") {
        response = await fetchCocktailByIngredient(category.name, 0);
      } else if (category.type === "spirit") {
        response = await fetchCocktailBySpiritType(category.name, 0);
      }
      else if (category.type === "name") {
        response = await fetchCocktailByName(category.name, 0);
      }

      if (!response || !response.data || response.data.length === 0) {
        throw new Error('No cocktails found');
      }

      if(category.type === "name"){
        navigate(`/cocktail/${category.name}`, { state: { cocktails: response.data } });
      }else{
        navigate(`/search/${category.name}`,  {state: { response: response.data } });
      }
    
    } catch (error) {
      console.error("Error fetching cocktails by category:", error);
      alert('No cocktails found for this category');
    }
  };

  return (
    <div className="CocktailBrowse">
      <div className="CocktailContent">
        {loading ? (
          <Loader />  
        ) : (
          <>
            <div className="ImageCorner">
              <img src={cocktails[0]?.imageUrl} alt={cocktails[0]?.name} />
            </div>

            <div className="RecepieInfo">
              <div className="DisplayInfo">
                <h1 className="CocktailName">{cocktails[0]?.name}</h1>
                <h2 className="CocktailIngreidentAmount">Ingredients: {cocktails[0]?.ingredients?.length}</h2>
                <h2 className="CocktailGlassType">Glass type: {cocktails[0]?.glassType}</h2>
                <div className="CocktailRelated">
                  <h2>Related Categories:</h2>
                  <div className="CategoryButtons">
                    {categories.length > 0 && categories.map((category, index) => (
                      <button key={index} className="CategoryButton" onClick={() => handleCocktailClick(category)}>
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
          </>
        )}
      </div>

      <div className="RecommendedCocktails">
        {RecomendedCocktails?.length > 0 ? (
          RecomendedCocktails.map((cocktail, index) => (
            <CocktailItem
              key={index}
              CocktailName={cocktail.name}
              Image={cocktail.imageUrl}
              onCocktailClick={() => handleCocktailClick({ name: cocktail.name, type: "name" })}  
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
