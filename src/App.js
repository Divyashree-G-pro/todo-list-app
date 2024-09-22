import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (indexToDelete) => {
    const newTodos = todos.filter((_, index) => index !== indexToDelete);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTodo}>Add</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span
              className={`todo-text ${todo.completed ? 'completed' : ''}`}
              onClick={() => handleToggleComplete(index)}
            >
              {todo.text}
            </span>
            <div className="todo-icons">
              <button onClick={() => handleToggleComplete(index)}>
                {todo.completed ? '✔' : '✎'}
              </button>
              <button onClick={() => handleDeleteTodo(index)}>🗑</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
