import React, { useState } from 'react';

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

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
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          onClick={handleAddTask}
        >
          Ajouter
        </button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task.id} className="border-b py-2 flex justify-between items-center">
            <span>{task.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskApp;