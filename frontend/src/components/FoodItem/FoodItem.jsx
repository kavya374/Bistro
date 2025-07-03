import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ id, name, price, description, rating, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  // Prevent rendering if id or cartItems is missing
  //if (!id || !cartItems) return null;

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />
        {
          !cartItems?.[id] ? (
            <i
              className="bi bi-plus-circle-fill add"
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
            ></i>
          ) : (
            <div className="food-item-counter">
              <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
              <p>{cartItems[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" />
            </div>
          )
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
        <p className="food-item-price">₹{price}</p>
        <p className='food-item-rating'>⭐ {rating}</p>
        </div>
     
      </div>
    </div>
  );
};

export default FoodItem;
