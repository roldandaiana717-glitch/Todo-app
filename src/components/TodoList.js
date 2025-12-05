import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch('http://localhost:3001/todos');

      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de todos");
      }

      const data = await response.json();
      setTodos(data);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!response.ok) throw new Error("No se pudo actualizar");

      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      ));

    } catch (error) {
      setError("Error al actualizar el estado");
    }
  };

  const deleteTodo = async (id) => {
    if (!window.confirm('¿Eliminar este todo?')) return;

    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error("No se pudo eliminar");

      setTodos(todos.filter(todo => todo.id !== id));

    } catch (error) {
      setError("Error al eliminar el todo");
    }
  };

  if (loading) {
    return <div>Cargando todos...</div>;
  }

  return (
    <div>
      <h2>Mis Todos</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <Link to="/add">+ Agregar Nuevo Todo</Link>

      {todos.length === 0 ? (
        <p>No hay todos. <Link to="/add">Crear el primero</Link></p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id, todo.completed)}
              />

              <span style={{
                marginLeft: 8,
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}>
                {todo.title}
              </span>

              <button
                style={{ marginLeft: 15 }}
                onClick={() => deleteTodo(todo.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
