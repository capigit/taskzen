import React, { useState } from 'react';
import { Trash2, CheckCircle } from 'lucide-react';

function TaskList({ tasks, updateTask, deleteTask }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleSave = (task) => {
    if (editText.trim()) {
      updateTask(task.id, { text: editText.trim() });
    }
    setEditingId(null);
    setEditText('');
  };

  return (
    <ul>
      {tasks.map(task => (
        <li
          key={task.id}
          className="border-b py-2 flex justify-between items-center"
        >
          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={() => updateTask(task.id, { done: !task.done })}
              className={`text-green-600 hover:text-green-800 ${task.done ? 'opacity-50' : ''}`}
              title="Marquer comme terminé"
            >
              <CheckCircle size={20} />
            </button>

            {editingId === task.id ? (
              <input
                className="flex-1 border px-2 py-1 rounded"
                value={editText}
                onChange={e => setEditText(e.target.value)}
                onBlur={() => handleSave(task)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSave(task);
                  if (e.key === 'Escape') setEditingId(null);
                }}
                autoFocus
              />
            ) : (
              <span
                className={`cursor-pointer ${task.done ? 'line-through text-gray-400' : ''}`}
                onDoubleClick={() => handleEdit(task)}
              >
                {task.text}
              </span>
            )}
          </div>

          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteTask(task.id)}
            title="Supprimer"
          >
            <Trash2 size={20} />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;