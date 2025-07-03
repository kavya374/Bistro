import React from 'react';
import { Link } from 'react-router-dom';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';
import LazyImage from '../../components/LazyImage/LazyImage';



const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <div className="head">
        <h1>Bistro's Menu</h1>
        <Link to="/menu"><i className="bi bi-chevron-double-right"></i></Link>
      </div>

      <p className="explore-menu-text">
        Discover a variety of dishes crafted with passion and the freshest ingredients. 
        From timeless classics to bold new flavors, our menu is designed to satisfy every craving. 
        Whether you're in the mood for something light or indulgent, there's something here for everyone.
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className="explore-menu-list-item"
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? 'All' : item.menu_name
              )
            }
          >
            
            <LazyImage
  src={item.menu_image}
  alt={item.menu_name}
  className={category === item.menu_name ? 'active' : ''}
/>
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
