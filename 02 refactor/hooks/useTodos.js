import { useState, useEffect } from 'react';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await res.json();
      setTodos(data);
    })();
  });

  return [todos, setTodos];
}
