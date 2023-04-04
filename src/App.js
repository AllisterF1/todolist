import React, { useState } from "react";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoAdd = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo.trim(), checked: false }]);
      setNewTodo("");
    }
  };

  const handleTodoCheck = (index) => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  };

  const handleTodoEdit = (index, newText) => {
    if (index === editIndex) {
      const newTodos = [...todos];
      newTodos[index].text = newText.trim();
      setTodos(newTodos);
      setEditIndex(-1);
    }
  };

  const handleTodoDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="new-todo">
        <input
          type="text"
          placeholder="Enter new to-do item"
          value={newTodo}
          onChange={handleNewTodoChange}
        />
        <button onClick={handleNewTodoAdd}>Add</button>
      </div>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <div key={index} className="todo-item">
            <input
              
              type="checkbox"
              checked={todo.checked}
              onChange={() => handleTodoCheck(index)}
            />
            {todo.checked ? (
            <span className="todo-done">{todo.text}</span>
   
            ) : (
              editIndex === index ? (
                <input
                  className="todo-edit"
                  type="text"
                  value={todo.text}
                  onChange={(event) => handleTodoEdit(index, event.target.value)}
                />
              ) : (
                <span onClick={() => handleTodoCheck(index)}>{todo.text}</span>
              )
            )}


            {editIndex !== index && (
              <button onClick={() => handleEditClick(index)}>Edit</button>
            )}
            <button onClick={() => handleTodoDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;