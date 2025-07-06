const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRoutes);

app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
});