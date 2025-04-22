import { fetchTodos } from "./FetchTodos";

export const addTodo = async (todo, setTodo, setAllTodos) => {
  try {
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    });
    if (response.ok) {
      fetchTodos(setAllTodos);
    }
  } catch (error) {
    console.error("Error adding todo:", error);
  }
  setTodo("");
};
