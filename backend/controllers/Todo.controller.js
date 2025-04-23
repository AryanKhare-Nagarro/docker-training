import { Todo } from "../models/TodoModel.js";

export const getAllTodos = async (req, res) => {
    const allTodos = await Todo.find({});
    res.status(200).json(allTodos);
};

export const createTodo = async (req, res) => {
    const { todo } = req.body;
    await Todo.create({ text: todo });
    res.status(201).json({ message: 'Todo created successfully!' });
};

export const deleteTodo = async (req, res) => {
    const { _id } = req.body;
    await Todo.deleteOne({ _id });
    res.status(200).json({ message: 'Todo deleted successfully!' });
};