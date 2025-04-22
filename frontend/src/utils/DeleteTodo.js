import { fetchTodos } from "./FetchTodos";

export const handleDelete = async (_id, setAllTodos) => {
    try {
        const response = await fetch('http://localhost:3000', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id }),
        });
        if(response.ok) {
            fetchTodos(setAllTodos);
        }
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
}