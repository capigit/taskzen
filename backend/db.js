const Database = require('better-sqlite3');
const db = new Database('tasks.db');

// Création de la table
db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    done INTEGER DEFAULT 0
  )
`).run();

module.exports = db;