import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AllProducts.css';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    sku: '',
    name: '',
    price: '',
    image: '',
  });

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/products/allProducts");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/products/delete/${id}`);
      fetchProducts(); // Refresh list
    } catch (error) {
      console.log(error);
    }
  };

  // Start editing
  const handleEdit = (product) => {
    setEditId(product._id);
    setEditForm({
      sku: product.sku,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  // Save updated product
  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/products/update/${id}`, editForm);
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="table-container">
      <h2>All Products</h2>
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>
                {editId === p._id ? (
                  <input name="sku" value={editForm.sku} onChange={handleChange} />
                ) : (
                  p.sku
                )}
              </td>
              <td>
                {editId === p._id ? (
                  <input name="image" value={editForm.image} onChange={handleChange} />
                ) : (
                  <img
                    src={`http://127.0.0.1:5000/${p.image}`}
                    alt={p.name}
                    className="product-img"
                  />
                )}
              </td>
              <td>
                {editId === p._id ? (
                  <input name="name" value={editForm.name} onChange={handleChange} />
                ) : (
                  p.name
                )}
              </td>
              <td>
                {editId === p._id ? (
                  <input name="price" value={editForm.price} onChange={handleChange} />
                ) : (
                  `₹${p.price}`
                )}
              </td>
              <td>
                {editId === p._id ? (
                  <button className="btn save" onClick={() => handleUpdate(p._id)}>
                    Save
                  </button>
                ) : (
                  <button className="btn edit" onClick={() => handleEdit(p)}>
                    Edit
                  </button>
                )}
                <button className="btn delete" onClick={() => handleDelete(p._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;
