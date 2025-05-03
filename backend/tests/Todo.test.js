import { getAllTodos, createTodo, deleteTodo } from '../controllers/Todo.controller.js';
import { Todo } from '../models/TodoModel.js';
import { client } from '../db/ConnectCache.js';

// Mock the dependencies
jest.mock('../models/TodoModel.js');
jest.mock('../db/ConnectCache.js');

describe('Todo Controller Unit Tests', () => {
  let mockRequest, mockResponse, mockNext;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Create fresh mock objects for each test
    mockRequest = {
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  describe('getAllTodos', () => {
    it('should return 200 with all todos when successful', async () => {
      const mockTodos = [
        { _id: '1', text: 'Test todo 1' },
        { _id: '2', text: 'Test todo 2' }
      ];
      Todo.find.mockResolvedValue(mockTodos);

      await getAllTodos(mockRequest, mockResponse);

      expect(Todo.find).toHaveBeenCalledWith({});
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTodos);
    });

    it('should return empty array when no todos exist', async () => {
      Todo.find.mockResolvedValue([]);

      await getAllTodos(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([]);
    });
  });

  describe('createTodo', () => {
    it('should create todo, cache it, and return 201 when successful', async () => {
      const mockTodo = { 
        _id: '507f1f77bcf86cd799439011', 
        text: 'New todo',
        save: jest.fn().mockResolvedValue(true)
      };
      mockRequest.body = { todo: 'New todo' };
      Todo.mockImplementation(() => mockTodo);

      await createTodo(mockRequest, mockResponse);

      expect(Todo).toHaveBeenCalledWith({ text: 'New todo' });
      expect(mockTodo.save).toHaveBeenCalled();
      expect(client.set).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011', 
        'New todo'
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Todo created successfully!'
      });
    });

    it('should return 400 when todo text is missing', async () => {
      mockRequest.body = {};

      await createTodo(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Todo text is required'
      });
    });
  });

  describe('deleteTodo', () => {
    it('should delete todo, remove from cache, and return 200 when successful', async () => {
      mockRequest.body = { _id: '507f1f77bcf86cd799439011' };
      Todo.deleteOne.mockResolvedValue({ deletedCount: 1 });
      client.del.mockResolvedValue(1);

      await deleteTodo(mockRequest, mockResponse);

      expect(Todo.deleteOne).toHaveBeenCalledWith({ 
        _id: '507f1f77bcf86cd799439011' 
      });
      expect(client.del).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Todo deleted successfully!'
      });
    });
  });
});