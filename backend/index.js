// Importing required modules
import express from "express";
import cors from "cors";
import { connectDB } from "./db/ConnectDB.js";
import { TodoRouter } from "./routes/todoRoutes.js";
import { connectRedis } from "./db/ConnectCache.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();  // Connect to MongoDB
connectRedis(); // Connect to Redis Cache

// Middleware setup
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Parse JSON request bodies
app.use("/", TodoRouter); // Define routes for the Todo API

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
