import { client } from "../db/ConnectCache.js";
import { Todo } from "../models/TodoModel.js";

export const getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find({});
    res.status(200).json(allTodos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createTodo = async (req, res) => {
  const { todo } = req.body;
  try {
    const newTodo = new Todo({ text: todo });
    await newTodo.save();
    client.set(newTodo._id.toString(), todo);
    res.status(201).json({ message: "Todo created successfully!" });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodo = async (req, res) => {
  const { _id } = req.body;
  try {
    await Todo.deleteOne({ _id });
    client.del(_id.toString());
    res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};