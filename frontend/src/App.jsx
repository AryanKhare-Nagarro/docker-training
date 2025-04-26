import { useEffect, useState } from "react";  // Import React hooks and components
import { Card } from "./components/Card"; // Import the Card component
import { fetchTodos } from "./utils/FetchTodos";  // Import the utility function to fetch todos
import { addTodo } from "./utils/AddTodo";  // Import the utility function to add a todo
import "./App.css"; // Import CSS styles

function App() {
  const [todo, setTodo] = useState(""); // State to store the current todo input  
  const [allTodos, setAllTodos] = useState([]); // State to store the list of all todos
  
  // Effect to fetch all todos when the component mounts
  useEffect(() => {
    fetchTodos(setAllTodos);
  }, []);

  return (
    <>
      {/* Application title */}
      <h1>Docker Training</h1>

      {/* Input container for adding a new todo */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="todo-input"
        />
        <button 
          onClick={() => addTodo(todo, setTodo, setAllTodos)} // Add todo when button is clicked
          disabled={todo.trim() === ""} // Disable button if input is empty
        >Add</button>
      </div>

      {/* Container for displaying all todos */}
      <div className="todo-container">

        {/* Show a message if there are no todos */}
        {allTodos.length === 0 && (
          <h2>Enter your first todo...</h2>
        )}
        {/* Map thorugh the list of todos and render a Card component for each */}
        {allTodos.map((todo) => {
          return (
            <Card todo={todo} setAllTodos={setAllTodos} key={todo._id}/>
          )
        })}
      </div>
    </>
  );
}

export default App;
