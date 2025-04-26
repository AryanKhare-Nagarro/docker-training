/*
  * Function to fetch all todos from the backend and update the state.
  * Props:
  *   - setAllTodos: Function to update the list of all todos.
*/
export const fetchTodos = async (setAllTodos) => {
  try {
    // Send a GET request to the server to fetch all todos
    const response = await fetch("http://localhost:3000", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Parse the response data as JSON
    const data = await response.json();
    setAllTodos(data);  // Update the state with the fetched todos
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};
