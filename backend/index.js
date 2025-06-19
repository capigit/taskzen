const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mémoire temporaire
let tasks = [];

// GET - toutes les tâches
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST - ajouter une tâche
app.post('/tasks', (req, res) => {
  const newTask = {
    id: Date.now(),
    text: req.body.text || '',
    done: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT - modifier une tâche
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ message: 'Tâche non trouvée' });
  }
});

// DELETE - supprimer une tâche
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`API Express en cours sur http://localhost:${PORT}`);
});