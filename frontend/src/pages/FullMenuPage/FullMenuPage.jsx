import React, { useContext, useState } from "react";
import "./FullMenuPage.css";
import { StoreContext } from "../../components/context/StoreContext";
import FoodItem from "../../components/FoodItem/FoodItem";


const FullMenuPage = () => {
  const { food_list } = useContext(StoreContext);

  
  const categories = [...new Set(food_list.map(item => item.category))];

  
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(prev => (prev === category ? null : category));
  };

  return (
    <div className="full-menu-page">
      <h1>Our Full Menu</h1>
      <p className="full-menu-subtext">
        From street favorites to gourmet delights, explore everything we offer in one place.
      </p>

      {categories.map((category, i) => (
        <div key={i} className="menu-category-section">
          <div className="category-header" onClick={() => toggleCategory(category)}>
            <h2>{category}</h2>
            <span className="dropdown-icon">{openCategory === category ? "▲" : "▼"}</span>
          </div>

          {openCategory === category && (
            <div className="full-menu-list">
              {food_list
                .filter(item => item.category === category)
                .map((item, index) => (
                  <FoodItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    rating={item.rating}
                    image={item.image}
                  />
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FullMenuPage;
