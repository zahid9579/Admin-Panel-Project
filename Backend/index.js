import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoute from './routes/productRoute.js'
import connectDB from './db.js';
import path from 'path'

const app = express();
dotenv.config()
connectDB();
const port = process.env.PORT || 5000


// Middleware
app.use(express.json())
app.use(cors())

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));


// Routes
app.use('/api/products', productRoute);


app.get('/', (req, res) => {
    res.send("Server is running");
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})