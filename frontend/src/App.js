import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Erreur fetch:', err));
  }, []);

  return (
    <div>
      <h1>Liste des tâches</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} {task.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;