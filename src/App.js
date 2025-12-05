import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">

        {/* ------------------ HEADER ------------------ */}
        <header className="app-header">
          <h1>Mis Notas & Todos</h1>
        </header>

        {/* ------------------ NAVEGACIÓN ------------------ */}
        <nav className="app-nav">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/todos">Mis Todos</Link></li>
            <li><Link to="/add">Agregar Todo</Link></li>
          </ul>
        </nav>

        {/* ------------------ CONTENIDO PRINCIPAL ------------------ */}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/add" element={<AddTodo />} />
          </Routes>
        </main>

        {/* ------------------ FOOTER ------------------ */}
        <footer className="app-footer">
          <p>© 2025 Notas App · Inspirado en Evernote</p>
        </footer>

      </div>
    </Router>
  );
}

export default App;
