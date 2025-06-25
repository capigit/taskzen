const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Lecture de toutes les tâches
app.get('/tasks', (req, res) => {
  const tasks = db.prepare('SELECT * FROM tasks').all();
  res.json(tasks);
});

// Ajouter une tâche
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  const stmt = db.prepare('INSERT INTO tasks (text) VALUES (?)');
  const result = stmt.run(text);
  const newTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(newTask);
});

// Modifier une tâche
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { text, done } = req.body;
  db.prepare('UPDATE tasks SET text = ?, done = ? WHERE id = ?').run(text, done ? 1 : 0, id);
  const updated = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  res.json(updated);
});

// Supprimer une tâche
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`✅ Backend avec SQLite sur http://localhost:${PORT}`);
});