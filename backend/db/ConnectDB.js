import mongoose from "mongoose";

const uri = 'mongodb://localhost:27017/todo-app';
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
