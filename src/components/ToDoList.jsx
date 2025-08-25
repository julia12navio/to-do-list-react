import React, { useState, useEffect } from "react";
import "./ToDoList.css";

const STORAGE_KEY = "todo-tareas";

function ToDoList() {
    const [tarea, setTarea] = useState("");
    const [tareas, setTareas] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
        } catch {

        }
    }, [tareas]);

    function manejarSubmit(e) {
        e.preventDefault();
        const texto = tarea.trim();
        if (!texto) return;
        setTareas((prev) => [...prev, texto]);
        setTarea("");
    }

    function eliminarTarea(idx) {
        setTareas((prev) => prev.filter((_, i) => i !== idx));
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
                            tareas.map((t, idx) => (
                                <li
                                    key={idx}
                                    className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                                >
                                    <div>
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            id={`checkbox-${idx}`}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`checkbox-${idx}`}
                                        >
                                            {t}
                                        </label>
                                    </div>

                                    {/* Botón eliminar a la derecha */}
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger d-none"
                                        onClick={() => eliminarTarea(idx)}
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