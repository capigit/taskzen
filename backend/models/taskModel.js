const db = require('../db');

module.exports = {
  getAllTasks: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows.map(t => ({ ...t, done: !!t.done })));
      });
    });
  },

  createTask: (text) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO tasks (text) VALUES (?)', [text], function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, text, done: false });
      });
    });
  },

  updateTask: (id, { text, done }) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE tasks SET text = ?, done = ? WHERE id = ?',
        [text, done ? 1 : 0, id],
        function (err) {
          if (err) reject(err);
          else resolve({ id, text, done });
        }
      );
    });
  },

  deleteTask: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }
};