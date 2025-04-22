import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { fetchTodos } from "./utils/FetchTodos";
import { addTodo } from "./utils/AddTodo";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    fetchTodos(setAllTodos);
  }, []);

  return (
    <>
      <h1>Docker Training</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="todo-input"
        />
        <button onClick={() => addTodo(todo, setTodo, setAllTodos)}>Add</button>
      </div>

      <div className="todo-container">
        {allTodos.length === 0 && (
          <h2>Enter your first todo...</h2>
        )}
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
