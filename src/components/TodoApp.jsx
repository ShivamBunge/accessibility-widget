import React, { useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const updateTodo = () => {
    if (editText.trim() === "") return;
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <span>{todo.text}</span>
            <div>
              <button onClick={() => toggleComplete(todo.id)}>
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => startEdit(todo.id, todo.text)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editId && (
        <div id="edit-section">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Edit todo"
          />
          <button onClick={updateTodo}>Update</button>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
