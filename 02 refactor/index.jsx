import React, { useState, useEffect } from 'react';
import { useTodos } from "./hooks/useTodos";

const BuggyTodo = () => {
  const [ todos, setTodos ] = useTodos(); // 1
  const [newTodo, setNewTodo] = useState('');
  // 2

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo === '') return;

    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        title: newTodo,
        completed: false,
      },
    ]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        // 2
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const completedCount = todos.filter((todo) => todo.completed).length; // 2

  useEffect(() => {
    document.title = `${completedCount} tasks completed`;
  }, [completedCount]); // 3

  return (
    <div className="todo-container"> // 4
      <h1>Buggy Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos?.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed && 'line-through' }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.title}
          </li>
        ))}
      </ul>
      <div>Completed tasks: {completedCount}</div>
    </div>
  );
};

export default BuggyTodo;