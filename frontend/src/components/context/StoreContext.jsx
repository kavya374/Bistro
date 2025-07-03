import { createContext, useEffect, useState } from "react";
import axios from "axios";

// 🔑 This must be exported!
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [food_list, setFoodList] = useState([]);

  // ✅ Add to cart
  const addToCart = async (itemId) => {
    if (!itemId) return;

    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("Error adding to cart:", err);
      }
    }
  };

  // ✅ Remove from cart
  const removeFromCart = async (itemId) => {
    if (!itemId) return;

    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("Error removing from cart:", err);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      const itemInfo = food_list.find((product) => product._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.price * quantity;
      }
    }

    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
    } catch (err) {
      console.error("Failed to fetch food list:", err);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(response.data.cartData || {});
    } catch (err) {
      console.error("Failed to load cart data:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        await loadCartData(localToken);
      } else {
        setToken("");
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  if (loading) return null;

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

// 🔑 This must be exported too!
export default StoreContextProvider;
