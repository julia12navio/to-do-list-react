import React, { useState, useEffect } from "react";
import "./ToDoList.css";

const STORAGE = "todo-tareas";

function ToDoList() {
    const [tarea, setTarea] = useState("");
    const [tareas, setTareas] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE, JSON.stringify(tareas));
        } catch {

        }
    }, [tareas]);

    function manejarSubmit(e) {
        e.preventDefault();
        const texto = tarea.trim();
        if (!texto) return;
        const nueva = {
            id: crypto.randomUUID(),
            texto,
            done: false,
        }
        setTareas((prev) => [...prev, nueva]);
        setTarea("");
    }

    function toggleDone(id) {
        setTareas(prev =>
            prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
        );
    }

    function eliminarTarea(id) {
        setTareas((prev) => prev.filter((t) => t.id !== id));
    }


    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <h1 className="h4 mb-3 text-center">To Do List</h1>

                    <form onSubmit={manejarSubmit} className="mb-3">
                        <div className="row g-2">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Escribe una tarea"
                                    value={tarea}
                                    onChange={(e) => setTarea(e.target.value)}
                                    aria-label="Nueva tarea"
                                />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-info">
                                    Añadir
                                </button>
                            </div>
                        </div>
                    </form>


                    {/* Lista de tareas */}
                    <ul className="list-group">
                        {tareas.length === 0 ? (
                            <p className="text-center alert alert-info">
                                No hay tareas, añadir tareas
                            </p>
                        ) : (
                            tareas.map((t) => (
                                <li
                                    key={t.id}
                                    className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                                >
                                    <div>
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            id={`checkbox-${t.id}`}
                                            checked={t.done}
                                            onChange={() => toggleDone(t.id)}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`checkbox-${t.id}`}
                                            style={{ textDecoration: t.done ? "line-through" : "none" }}
                                        >
                                            {t.texto}
                                        </label>
                                    </div>

                                    {/* Botón eliminar a la derecha */}
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger d-none"
                                        onClick={() => eliminarTarea(t.id)}
                                    >
                                        ×
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ToDoList;