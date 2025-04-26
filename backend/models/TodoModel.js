// Import necessary modules
import mongoose from "mongoose";

/* 
    * Define the schema for the Todo model.
    * 'id': A unique identifier for the todo item.
    * 'text': The text content of the todo item.
    * Note: The 'id' field is not strictly necessary as MongoDB generates a unique '_id' for each document.
*/
const schema = new mongoose.Schema({
    id: String,
    text: String,
});

/*
    * Create the Todo model using the defined schema.
    * The model will be used to interact with the 'todos' collection in the MongoDB database.
*/
export const Todo = mongoose.model('Todo', schema);