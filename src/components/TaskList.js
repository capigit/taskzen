// src/components/TaskList.js
import React from 'react';
import { CheckCircle, Trash2 } from 'lucide-react';

export default function TaskList({ tasks, setTasks }) {

  const toggleDone = (id) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearAll = () => {
    if (window.confirm('Voulez-vous vraiment tout effacer ?')) {
      setTasks([]);
    }
  };

  return (
    <>
      <ul>
        {tasks.map(task => (
          <li
            key={task.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div className="flex items-center gap-2 flex-1">
              <button
                onClick={() => toggleDone(task.id)}
                className={`text-green-600 hover:text-green-800 ${
                  task.done ? 'opacity-50' : ''
                }`}
                title="Marquer comme terminé"
              >
                <CheckCircle size={20} />
              </button>
              <span
                className={`cursor-pointer ${
                  task.done ? 'line-through text-gray-400' : ''
                }`}
                onClick={() => toggleDone(task.id)}
              >
                {task.text}
              </span>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => removeTask(task.id)}
              title="Supprimer"
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
      {tasks.length > 0 && (
        <div className="flex justify-end mb-4">
          <button
            className="text-sm text-red-600 hover:text-red-800 underline"
            onClick={clearAll}
          >
            Effacer toutes les tâches
          </button>
        </div>
      )}
    </>
  );
}