import express from 'express'
import { allProduct, createProduct, deleteProduct, updateProduct } from '../controllers/productController.js';
import authorizeAdmin from '../middleware/authMiddleware.js';
import upload from '../middleware/multerConfig.js';
const router = express.Router();

// Only Admin Can Create, Update, And Delete Product
router.post('/create', upload.single('image'), createProduct, authorizeAdmin);
router.get("/allProducts", allProduct);
router.put("/update/:id", updateProduct, authorizeAdmin);
router.delete("/delete/:id", deleteProduct, authorizeAdmin);

export default router;