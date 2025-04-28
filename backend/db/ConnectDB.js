// Import mongoose for MongoDB connection
import mongoose from "mongoose";

// MongoDB connection URI
// Note: Ensure that MongoDB is running on your docker container with port 27017 exposed
const uri = 'mongodb://mongo:27017/todo-app';

// Function to connect to MongoDB
export const connectDB = () => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("MongoDB connected successfully!");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};
