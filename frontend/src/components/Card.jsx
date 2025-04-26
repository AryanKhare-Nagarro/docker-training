// Import the utility function to handle todo deletion
import { handleDelete } from "../utils/DeleteTodo"

/*
    * Card component to display individual todo items
    * Display the todo text and a delete button
    * Props:
    *   - todo: The todo item to be displayed
    *   - setAllTodos: Function to update the list of all todos after deletion
*/
export const Card = ({ todo, setAllTodos }) => {
    return (
        <div className="card-container">
            <h3>{todo.text}</h3>
            <button onClick={() => handleDelete(todo._id, setAllTodos)}>Delete</button>
        </div>
    )
}