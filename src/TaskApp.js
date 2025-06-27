import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import TaskList from './components/TaskList';

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  // Charger les tâches depuis le localStorage
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Sauvegarder les tâches dans le localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (input.trim() === '') return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: input.trim(),
        done: false,
        isEditing: false
      }
    ]);
    setInput('');
  };

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
          placeholder="Nouvelle-tâche"
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

      <TaskList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
}

export default TaskApp;