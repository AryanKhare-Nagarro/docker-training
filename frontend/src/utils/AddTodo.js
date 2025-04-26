// Import the utility function to fetch all todos
import { fetchTodos } from "./FetchTodos";

/*
  * Function to add a new todo to the database and update the state.
  * Props:
  *   - todo: The todo item to be added.
  *   - setTodo: Function to reset the todo input state.
  *   - setAllTodos: Function to update the list of all todos after adding a new one.
*/
export const addTodo = async (todo, setTodo, setAllTodos) => {
  try {
    // Send a POST request to the server to add a new todo
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    });
    // Check if the response is OK (status code 200)
    // Fetch the updated list of todos from the server
    if (response.ok) {
      fetchTodos(setAllTodos);
    }
  } catch (error) {
    console.error("Error adding todo:", error);
  }
  setTodo("");  // Reset the todo input state to an empty string
};
