const express = require('express');
const router = express.Router();
const taskModel = require('../models/taskModel');

// Obtenir toutes les tâches
router.get('/', async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Créer une tâche
router.post('/', async (req, res) => {
  const { text } = req.body;
  try {
    const task = await taskModel.createTask(text);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mettre à jour une tâche
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text, done } = req.body;
  try {
    const updated = await taskModel.updateTask(id, { text, done });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer une tâche
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await taskModel.deleteTask(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;