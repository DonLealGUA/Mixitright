// mockApi.js

export const fetchMockData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 7,
              name: "Piña Colada",
              instructions: "Blend all ingredients with ice until smooth and pour into a chilled glass.",
              imageUrl: "/Assets/SpiritIcons/PinaColada.webp",
              glassType: "Cocktail Glass",
              spiritTypes: ["Rum"],
              ingredients: [
                { ingredientName: "Coconut cream", quantity: "30 ml", spiritTypeName: null },
                { ingredientName: "Pineapple juice", quantity: "90 ml", spiritTypeName: null },
                { ingredientName: null, quantity: "50 ml", spiritTypeName: "Rum" },
              ],
              createdBy: null,
              createdByLink: null,
              createdDate: "2024-11-05T21:41:36.023+00:00",
              spiritBrand: null,
              iceForm: null,
            },
            {
              id: 8,
              name: "Vodka Martini",
              instructions: "Shake vodka and dry vermouth with ice and strain into a chilled martini glass.",
              imageUrl: "/Assets/SpiritIcons/Martini.webp",
              glassType: "Martini Glass",
              spiritTypes: ["Dry Vermouth", "Vodka"],
              ingredients: [
                { ingredientName: "Olive", quantity: "1 olive", spiritTypeName: null },
                { ingredientName: null, quantity: "10 ml", spiritTypeName: "Dry Vermouth" },
                { ingredientName: null, quantity: "50 ml", spiritTypeName: "Vodka" },
              ],
              createdBy: null,
              createdByLink: null,
              createdDate: "2024-11-05T21:41:36.023+00:00",
              spiritBrand: null,
              iceForm: null,
            },
            {
              id: 6,
              name: "Mojito",
              instructions: "Muddle mint leaves with sugar and lime juice. Add rum and top with soda water.",
              imageUrl: "/Assets/SpiritIcons/Mojito.webp",
              glassType: "Highball Glass",
              spiritTypes: ["Rum"],
              ingredients: [
                { ingredientName: "Mint leaves", quantity: "10 leaves", spiritTypeName: null },
                { ingredientName: "Lime", quantity: "1/2 lime", spiritTypeName: null },
                { ingredientName: "Sugar", quantity: "1 tsp", spiritTypeName: null },
                { ingredientName: "Soda water", quantity: "Top-up", spiritTypeName: null },
                { ingredientName: null, quantity: "1 cup", spiritTypeName: "Rum" },
              ],
              createdBy: null,
              createdByLink: null,
              createdDate: "2024-11-05T21:41:36.023+00:00",
              spiritBrand: "Bacardi",
              iceForm: null,
            },
            {
              id: 10,
              name: "Mojito",
              instructions: "Muddle mint leaves with sugar and lime juice...",
              imageUrl: "/Assets/SpiritIcons/Mojito.webp",
              glassType: null,
              spiritTypes: [],
              ingredients: [],
              createdBy: null,
              createdByLink: null,
              createdDate: "2024-11-07T18:17:25.480+00:00",
              spiritBrand: null,
              iceForm: null,
            },
            {
              id: 11,
              name: "Zacapa Mojito",
              instructions: "Muddle mint leaves with sugar and lime juice. Add rum and top with soda water.",
              imageUrl: "/Assets/SpiritIcons/Mojito.webp",
              glassType: "Highball Glass",
              spiritTypes: ["Rum"],
              ingredients: [
                { ingredientName: "Mint leaves", quantity: "10 leaves", spiritTypeName: null },
                { ingredientName: "Lime", quantity: "1/2 lime", spiritTypeName: null },
                { ingredientName: "Sugar", quantity: "1 tsp", spiritTypeName: null },
                { ingredientName: "Soda water", quantity: "Top-up", spiritTypeName: null },
                { ingredientName: null, quantity: "1 cup", spiritTypeName: "Rum" },
              ],
              createdBy: null,
              createdByLink: null,
              createdDate: "2024-11-05T21:41:36.023+00:00",
              spiritBrand: "Bacardi",
              iceForm: null,
            },
          ],
          totalItems: 4,
          totalPages: 1,
          currentPage: 0,
          pageSize: 10,
        });
      }, 1000); 
    });
  };
  
  export const fetchMojitoData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 6,
              name: "Mojito",
              instructions: "Muddle mint leaves with sugar and lime juice. Add rum and top with soda water.",
              imageUrl: "/Assets/SpiritIcons/Mojito.webp",
              glassType: "Highball Glass",
              spiritTypes: ["Rum"],
              ingredients: [
                { ingredientName: "Mint leaves", quantity: "10 leaves", spiritTypeName: null },
                { ingredientName: "Lime", quantity: "1/2 lime", spiritTypeName: null },
                { ingredientName: "Sugar", quantity: "1 tsp", spiritTypeName: null },
                { ingredientName: "Soda water", quantity: "Top-up", spiritTypeName: null },
                { ingredientName: null, quantity: "1 cup", spiritTypeName: "Rum" },
              ],
              createdBy: null,
              createdByLink: null,
              createdDate: "2024-11-05T21:41:36.023+00:00",
              spiritBrand: "Bacardi",
              iceForm: null,
            },
          ],
          totalItems: 1,
          totalPages: 1,
          currentPage: 0,
          pageSize: 10,
        });
      }, 1000);
    });
  };
  