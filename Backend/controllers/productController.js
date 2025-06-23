import Product from "../models/productModel.js";
import path from 'path'

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { sku, name, price } = req.body;


    //  Validate required fields
    if (!sku) return res.status(400).json({ error: "Please Provide SKU" });
    if (!req.file) return res.status(400).json({ error: "Please Upload image" });
    if (!name) return res.status(400).json({ error: "Please Enter name" });
    if (!price) return res.status(400).json({ error: "Please Enter price" });

    const image = req.file.path; 

    //  Check for duplicate SKU to avoid adding same product again
    const existProduct = await Product.findOne({ sku });
    if (existProduct) {
      return res.status(400).json({ error: "Product with this SKU already exists" });
    }

    //  Create new product instance
    const newProduct = new Product({ sku, image, name, price });

    //  Save to database
    await newProduct.save();

    res.status(201).json({ msg: "Product created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};



//  Get all products
const allProduct = async (req, res) => {
  try {
    //  Fetch all product entries from the database
    const products = await Product.find({});

    //  Handle case when no products are available
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products available" });
    }

    //  Send back the list of products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};




// Update an existing product by ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { sku, image, name, price } = req.body;

    // Validate input fields
    if (!sku) return res.status(400).json({ error: "Please Provide SKU" });
    if (!image) return res.status(400).json({ error: "Please Upload image" });
    if (!name) return res.status(400).json({ error: "Please Enter name" });
    if (!price) return res.status(400).json({ error: "Please Enter price" });

    //  Find and update the product by ID
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { sku, image, name, price },
      { new: true } 
    );

    //  If product not found
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    //  Send updated product
    res.status(200).json({ msg: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};



//  Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    //  Check if product exists before deletion
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }

    //  Respond with success message
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

//  Export all controller functions for routing
export {
  createProduct,
  allProduct,
  updateProduct,
  deleteProduct
};
