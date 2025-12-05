import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTodo() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("El título no puede estar vacío");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          completed: false
        }),
      });

      if (!response.ok) throw new Error("No se pudo crear el todo");

      navigate('/todos');

    } catch (error) {
      setError("Error al crear el todo. Intenta nuevamente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Agregar Nuevo Todo</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Escribe tu tarea..."
            disabled={loading}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Agregar Todo'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/todos')}
            disabled={loading}
            style={{ marginLeft: 10 }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
