import mongoose from "mongoose";

// Connect To Database
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.mongodbURI);
        console.log("Connected To Database👍");

    } catch (error) {
        console.log("Falied to connect db")
        process.exit(1)
    }
}

export default connectDB;