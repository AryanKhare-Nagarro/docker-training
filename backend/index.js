import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT  = process.env.PORT || 3000;
const uri = 'mongodb://localhost:27017/todo-app';

mongoose.connect(uri).then(() => {
    console.log('MongoDB connected successfully!');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

const schema = new mongoose.Schema({
    id: String,
    text: String,
});
const Todo = mongoose.model('Todo', schema);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const allTodos = await Todo.find({});
    res.status(200).json(allTodos);
});

app.post('/', async (req, res) => {
    const { todo } = req.body;
    await Todo.create({ text: todo });
    res.status(201).json({ message: 'Todo created successfully!' });
});

app.delete('/', async (req, res) => {
    const { _id } = req.body;
    await Todo.deleteOne({ _id });
    res.status(200).json({ message: 'Todo deleted successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
