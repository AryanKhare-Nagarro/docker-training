// Import the Express framework for creating the router
import express from 'express';

// Import controller functions for handling requests
import { createTodo, deleteTodo, getAllTodos } from '../controllers/Todo.controller.js';

// Create a new router instance using Express
export const TodoRouter = express.Router();

/*
    * Define the routes for the Todo API.
    * -GET /: Fetch all todo items.
    * -POST /: Create a new todo item.
    * -DELETE /: Delete a specific todo item.
*/
TodoRouter.get('/', getAllTodos);
TodoRouter.post('/', createTodo);
TodoRouter.delete('/', deleteTodo);