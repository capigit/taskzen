import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import TaskList from './components/TaskList';

const API_URL = 'http://localhost:3001/tasks';

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  // 🔁 Charger les tâches depuis l'API
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setTasks)
      .catch(err => console.error('Erreur chargement tâches:', err));
  }, []);

  // ➕ Ajouter une tâche via POST
  const handleAddTask = async () => {
    if (input.trim() === '') return;
    const newTask = { text: input.trim() };
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    const saved = await res.json();
    setTasks(prev => [...prev, saved]);
    setInput('');
  };

  // ✅ Filtrage
  const filteredTasks = tasks.filter(task =>
    filter === 'active' ? !task.done :
    filter === 'done' ? task.done : true
  );

  // 🔁 Mettre à jour une tâche
  const updateTask = async (id, updates) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const updated = await res.json();
    setTasks(prev => prev.map(t => t.id === id ? updated : t));
  };

  // ❌ Supprimer une tâche
  const deleteTask = async id => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6">
      {/* ... même UI, mêmes boutons ... */}

      <TaskList
        tasks={filteredTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default TaskApp;