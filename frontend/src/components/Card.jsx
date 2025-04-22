import { handleDelete } from "../utils/DeleteTodo"

export const Card = ({ todo, setAllTodos }) => {
    return (
        <div className="card-container">
            <h3>{todo.text}</h3>
            <button onClick={() => handleDelete(todo._id, setAllTodos)}>Delete</button>
        </div>
    )
}