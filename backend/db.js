const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'tasks.db'), (err) => {
  if (err) {
    console.error('Erreur lors de la connexion à SQLite:', err.message);
  } else {
    console.log('Connecté à la base de données SQLite.');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
  )
`);

module.exports = db;