import React, { useState } from "react";
import "./Styles/Search.css";
import CocktailList from "../Components/CocktailList";

const Search = () => {
  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      name: "Frozen Pineapple Mango Daiquiri",
      type: "/Assets/SpiritIcons/Screenshot_5.jpg",
    },
    { id: 2, name: "Mojito", type: "/Assets/SpiritIcons/Screenshot_5.jpg" },
    { id: 2, name: "Mojito", type: "/Assets/SpiritIcons/Screenshot_5.jpg" },
    { id: 2, name: "Mojito", type: "/Assets/SpiritIcons/Screenshot_5.jpg" },
    { id: 2, name: "Mojito", type: "/Assets/SpiritIcons/Screenshot_5.jpg" },
    { id: 2, name: "Mojito", type: "/Assets/SpiritIcons/Screenshot_5.jpg" },
  ]);

  const BrowseCategory = "Rum";

  return (
    <div className="Browse">
      <div className="Content">
        <div className="UpperContent">
          <div class="SpiritsHeader">
            <div class="SpiritsTitle">{BrowseCategory}</div>
            <div class="Decoration">
              <span class="circle"></span>
            </div>
          </div>
        </div>

        <div className="LowerContent">
        <div className="BrowseContet">
            <CocktailList ingredients={ingredients} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
