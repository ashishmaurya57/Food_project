import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const url = "http://localhost:3000";
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", data);
    console.log("Selected Image:", image);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", image);

      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          category: "Salad",
          price: ""
        });
        setImage(null);
        toast.success(response.data.message)
        // alert("Product added successfully!");
      } else {
        console.error("Error adding product:", response.data.message);
        // alert("Failed to add product.");
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={handleSubmit}>
        <div className='add-image flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt='Upload area' />
          </label>
          <input
            type='file'
            id='image'
            hidden
            onChange={handleImageChange}
            required
          />
        </div>

        <div className='add-product-name flex-col'>
          <p>Product Name</p>
          <input
            type='text'
            name='name'
            placeholder='Type here'
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className='add-product-description flex-col'>
          <p>Product Description</p>
          <textarea
            name='description'
            rows='6'
            cols='30'
            placeholder='Write content here'
            value={data.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className='add-category-price flex'>
          <div className='add-category flex-col'>
            <p>Product Category</p>
            <select
              name='category'
              value={data.category}
              onChange={handleChange}
              required
            >
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Dessert'>Dessert</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure Veg'>Pure Veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodles'>Noodles</option>
            </select>
          </div>

          <div className='add-price flex-col'>
            <p>Product Price</p>
            <input
              type='number'
              name='price'
              placeholder='$20'
              value={data.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type='submit' className='add-button'>Add</button>
      </form>
    </div>
  );
};

export default Add;
