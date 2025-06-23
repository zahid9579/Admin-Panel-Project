Product Management App (CRUD)

A full-stack MERN project to manage products in a store or inventory system. Built to perform Create, Read, Update, and Delete (CRUD) operations using REST API and React.

🚀 Features
 Add new products with image upload

 View all products in a clean table UI

 Edit product inline (SKU, Name, Price, Image)

 Delete any product

 Image handling using Multer (stored in /uploads)

 Responsive and professional UI using plain CSS

🛠️ Tech Stack
Tech	Used For
React.js	Frontend (UI)
Node.js	Backend server
Express.js	Routing / API
MongoDB	Database
Multer	Image upload!

Frontend UI
[Screenshot 2025-06-24 024827](https://github.com/user-attachments/assets/8b523e16-1d58-4564-9c6f-e590d86b4d78)
![Screenshot 2025-06-24 024857](https://github.com/user-attachments/assets/f32e8305-dd07-4ebc-8230-684b3b9cbefe)

Axios	API requests
React Hook Form	Form management

📁 Folder Structure

backend/
├── controllers/
│   └── productController.js
├── middleware/
│   └── multerConfig.js
├── models/
│   └── productModel.js
├── routes/
│   └── productRoutes.js
├── uploads/         // stores uploaded images
└── index.js         // main server entry point

frontend/
├── src/
│   ├── components/
│   │   ├── CreateProduct.jsx
│   │   ├── AllProducts.jsx
│   ├── App.js
│   └── index.js
└── public/


