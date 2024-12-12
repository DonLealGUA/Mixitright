const apiUrl = "https://cocktail-vault-api.onrender.com/api/cocktails/";

export const fetchRandom = async (amount) => {
  try {
    const apiCall = `${apiUrl}multirandom/${amount}`;
    const response = await fetch(apiCall);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    
    return result.data || []; 
  } catch (error) {
    console.log(error);
    return null;
  }
};

  export const fetchCocktailAmount = async () => {
    try {
      const apiCall = `${apiUrl}count`;
      const response = await fetch(apiCall);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const amount = await response.json();
      console.log(amount); 
      return amount;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  

  export const fetchCocktails = async (currentPage) => {
    try{
      const apiCall = `${apiUrl}page?page=${currentPage}&size=20`;
      const response = await fetch(apiCall);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const cocktails = await response.json();
      return cocktails;
    }catch(error){
      console.log(error);
      return null;
    }
  }

  export const fetchLatestCocktails = async (currentPage) => {
    try{
      const apiCall = `${apiUrl}latest?page=${currentPage}&size=20`;
      const response = await fetch(apiCall);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const cocktails = await response.json();
      return cocktails;
    }catch(error){
      console.log(error);
      return null;
    }
  }

  export const fetchCocktailByName = async (name, currentPage) => {
    try {
      const apiCall = `${apiUrl}${name}?page=${currentPage}&size=20`; 
      const response = await fetch(apiCall);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const cocktails = await response.json();
      return cocktails;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  

  export const fetchCocktailByLetter = async (letter,currentPage) => {
    try{
      const apiCall = `${apiUrl}by-letter/${letter}?page=${currentPage}&size=20`;
      const response = await fetch(apiCall);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const cocktails = await response.json();
      return cocktails;
    }catch(error){
      console.log(error);
      return null;
    }
  }

  export const fetchCocktailByBrand = async (brand,currentPage) => {
    try{
      const apiCall = `${apiUrl}filter/brand/${brand}?page=${currentPage}&size=20`;
      
      const response = await fetch(apiCall);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const cocktails = await response.json();
      return cocktails;
    }catch(error){
      console.log(error);
      return null;
    }
  }

  export const fetchCocktailBySpiritType = async (spirit, currentPage) => {
    try {
      const apiCall = `${apiUrl}filter/spirit/${spirit}?page=${currentPage}&size=20`;
      const response = await fetch(apiCall);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const cocktails = await response.json();
      return cocktails;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  

  export const fetchCocktailByGlassType = async (glasstype, currentPage) => {
    try{
      const apiCall = `${apiUrl}filter/glass/${glasstype}?page=${currentPage}&size=20`;
      const response = await fetch(apiCall);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const cocktails = await response.json();
      return cocktails;
    }catch(error){
      console.log(error);
      return null;
    }
  };

  export const fetchCocktailByIngredient= async (ingredient, currentPage) => {
    try{
      const apiCall = `${apiUrl}filter/ingredient/${ingredient}?page=${currentPage}&size=20`;
      const response = await fetch(apiCall);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const cocktails = await response.json();
      return cocktails;
    }catch(error){
      console.log(error);
      return null;
    }
  };

  export const fetchCocktailByExactIngredients = async (ingredients, spirits, currentPage) => {
    try {
        const ingredientsQuery = ingredients
            .map(ingredient => `ingredients=${encodeURIComponent(ingredient)}`)
            .join('&');

        const spiritsQuery = spirits.length > 0
            ? spirits
                .map(spirit => `spirit_types=${encodeURIComponent(spirit)}`)
                .join('&')
            : '';

        const queryString = ingredientsQuery && spiritsQuery
            ? `${ingredientsQuery}&${spiritsQuery}`
            : ingredientsQuery || spiritsQuery;

        const apiCall = `${apiUrl}ingredients/exact?${queryString}&page=${currentPage}&size=20`;

        const response = await fetch(apiCall);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const cocktails = await response.json();
        
        if (!cocktails || !cocktails.data || cocktails.data.length === 0) {
            console.log('No cocktails found.');
            return null;
        }

        return cocktails.data;  
    } catch (error) {
        console.error('Error fetching exact cocktails:', error);
        return null;
    }
};

  
  export const fetchCocktailByPartialIngredients = async (ingredients, spirits, currentPage) => {
    try {
      const ingredientsQuery = ingredients
          .map(ingredient => `ingredients=${encodeURIComponent(ingredient)}`)
          .join('&');

      const spiritsQuery = spirits.length > 0
          ? spirits
              .map(spirit => `spirit_types=${encodeURIComponent(spirit)}`)
              .join('&')
          : '';

      const queryString = ingredientsQuery && spiritsQuery
          ? `${ingredientsQuery}&${spiritsQuery}`
          : ingredientsQuery || spiritsQuery;

      const apiCall = `${apiUrl}ingredients/partial?${queryString}&page=${currentPage}&size=20`;

      const response = await fetch(apiCall);
      if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const cocktails = await response.json();
      
      if (!cocktails || !cocktails.data || cocktails.data.length === 0) {
          console.log('No cocktails found.');
          return null;
      }

      return cocktails.data;  
  } catch (error) {
      console.error('Error fetching exact cocktails:', error);
      return null;
  }
  };

