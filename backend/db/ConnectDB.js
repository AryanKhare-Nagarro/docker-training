// Import mongoose for MongoDB connection
import mongoose from "mongoose";
import { configs } from "../config.js"; // Importing config for environment variables

// MongoDB connection URI
// Note: Ensure that MongoDB is running on your docker container.
const uri = configs.db.mongodb_url; // Use the MongoDB URL from environment variables

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
