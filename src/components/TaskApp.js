import React, { useState, useEffect } from 'react';
import { CheckCircle, Trash2, PlusCircle } from 'lucide-react';

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'done'

  // Charger les tâches au démarrage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Sauvegarder les tâches à chaque modification
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  // ✅ Filtrer les tâches selon le filtre actif
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.done;
    if (filter === 'done') return task.done;
    return true;
  });

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Ajouter une tâche</h2>
      <div className="flex gap-2 mb-4">
        <input
          className="border rounded px-3 py-2 flex-grow"
          type="text"
          placeholder="Nouvelle tâche"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 flex items-center gap-2"
          onClick={handleAddTask}
        >
          <PlusCircle size={20} />
          Ajouter
        </button>

      </div>

      <div className="flex justify-center gap-3 mb-4">
        <button
          className={`px-3 py-1 rounded ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFilter('all')}
        >
          Toutes
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFilter('active')}
        >
          Actives
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === 'done' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFilter('done')}
        >
          Terminées
        </button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div className="flex items-center gap-2 flex-1">
  <button
    onClick={() =>
      setTasks(
        tasks.map(t =>
          t.id === task.id ? { ...t, done: !t.done } : t
        )
      )
    }
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
    onClick={() =>
      setTasks(
        tasks.map(t =>
          t.id === task.id ? { ...t, done: !t.done } : t
        )
      )
    }
  >
    {task.text}
  </span>
</div>

            <button
              className="text-red-500 hover:text-red-700"
              onClick={() =>
                setTasks(tasks.filter(t => t.id !== task.id))
              }
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
      onClick={() => {
  if (window.confirm('Voulez-vous vraiment tout effacer ?')) {
    setTasks([]);
  }
}}

    >
      Effacer toutes les tâches
    </button>
  </div>
)}

    </div>
  );
}

export default TaskApp;