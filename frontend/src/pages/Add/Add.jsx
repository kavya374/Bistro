import React, { useState, useRef } from "react";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { assets } from "../../assets/assets";

const Add = () => {
  const [image, setImage] = useState(null);
  const imageInputRef = useRef(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    category: "Starters",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Validation
    if (
      !data.name.trim() ||
      !data.description.trim() ||
      !data.price ||
      !data.rating ||
      !image
    ) {
      return toast.error("Please fill all fields and upload an image.");
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("rating", data.rating);
      formData.append("image", image);

      const response = await axios.post(`${BASE_URL}/api/food/add`, formData);

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          rating: "",
          category: "Starters",
        });
        setImage(null);
        if (imageInputRef.current) imageInputRef.current.value = null;
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
         
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
           <p>Upload Image</p>
          <input
            ref={imageInputRef}
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="visually-hidden"
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="e.g. Margherita Pizza"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write description here"
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Starters">Starters</option>
              <option value="Main Course">Main course</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Pizza">Pizza</option>
              <option value="Burgers">Burgers</option>
              <option value="Side dish">Side dish</option>
              <option value="Beverages">Beverages</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="e.g. 299"
              required
            />
          </div>

          <div className="flex-col">
            <p>Rating</p>
            <input
              onChange={onChangeHandler}
              value={data.rating}
              type="number"
              name="rating"
              placeholder="e.g. 4.5"
              min="1"
              max="5"
              step="0.1"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
