export const fetchTodos = async (setAllTodos) => {
  try {
    const response = await fetch("http://localhost:3000", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setAllTodos(data);
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};
