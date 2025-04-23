import express from 'express';
import { createTodo, deleteTodo, getAllTodos } from '../controllers/Todo.controller.js';

export const TodoRouter = express.Router();

TodoRouter.get('/', getAllTodos);
TodoRouter.post('/', createTodo);
TodoRouter.delete('/', deleteTodo);