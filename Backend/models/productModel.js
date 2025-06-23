import mongoose from "mongoose";

// Product Schema 
const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: true

    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

}, {timestamps: true}

);

// Creating the Product model
const Product = mongoose.model("Product", productSchema);
export default Product;