import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './CreateProduct.css'; // 👈 CSS file

const CreateProduct = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Prepare FormData for file upload
      const formData = new FormData();
      formData.append('sku', data.sku);
      formData.append('image', data.image[0]); // Single file
      formData.append('name', data.name);
      formData.append('price', data.price);

      const res = await axios.post('http://127.0.0.1:5000/api/products/create', formData);
      alert(res.data.msg || "Product Created");
      reset();
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    }
  };

  return (
    <div className="form-container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            placeholder="Enter SKU"
            {...register('sku', { required: 'This field is required' })}
          />
          {errors.sku && <span className="error">{errors.sku.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            {...register('image', { required: 'This field is required' })}
          />
          {errors.image && <span className="error">{errors.image.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter product name"
            {...register('name', { required: 'This field is required' })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter product price"
            {...register('price', { required: 'This field is required' })}
          />
          {errors.price && <span className="error">{errors.price.message}</span>}
        </div>

        <div className="button-group">
          <button type="submit" className="btn submit-btn">Add Product</button>
          <button type="button" className="btn view-btn" onClick={() => window.location.href = '/all-products'}>
            View Products →
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
