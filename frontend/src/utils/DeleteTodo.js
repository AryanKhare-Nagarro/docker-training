// Import utility function to fetch todos
import { fetchTodos } from "./FetchTodos";

/*
    * Function to handle the deletion of a todo item.
    * Props:
    *   - _id: The unique identifier of the todo item to be deleted.
    *   - setAllTodos: Function to update the list of all todos after deletion.
*/
export const handleDelete = async (_id, setAllTodos) => {
    try {
        // Send a DELETE request to the server to delete the todo item
        const response = await fetch('http://localhost:3000', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id }),
        });
        // Check if the response is OK (status code 200)
        // If successful, fetch the updated list of todos from the server
        if(response.ok) {
            fetchTodos(setAllTodos);
        }
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
}