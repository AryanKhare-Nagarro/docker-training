import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: String,
    text: String,
});

export const Todo = mongoose.model('Todo', schema);