// Import redis client for caching
import { client } from "../db/ConnectCache.js";

// Import Todo model for interacting with MongoDB 
import { Todo } from "../models/TodoModel.js";

/*
  * Controller to fetch, create and delete todos from the database and cache.
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
*/

// Fetch all todos from the MongoDB collection
export const getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find({});
    res.status(200).json(allTodos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new todo in the MongoDB collection and cache it
export const createTodo = async (req, res) => {
  const { todo } = req.body;  // Extract todo from request body
  try {
    // Create a new Todo instance and save it to the database
    const newTodo = new Todo({ text: todo });
    await newTodo.save();

    // Cache the new todo using its ID as the key
    client.set(newTodo._id.toString(), todo);

    // Send a success response
    res.status(201).json({ message: "Todo created successfully!" });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a todo from the MongoDB collection and remove it from the cache
export const deleteTodo = async (req, res) => {
  const { _id } = req.body; // Extract todo ID from request body
  try {
    // Delete the todo from the database using its ID
    await Todo.deleteOne({ _id });

    // Remove the Todo from the cache using its ID as the key
    client.del(_id.toString());

    // Send a success response
    res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};