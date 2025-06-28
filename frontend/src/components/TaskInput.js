import React from 'react';
import { PlusCircle } from 'lucide-react';

export default function TaskInput({ input, setInput, onAdd }) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        className="border rounded px-3 py-2 flex-grow"
        type="text"
        placeholder="Nouvelle tâche"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') onAdd(); }}
      />
      <button
        className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 flex items-center gap-2"
        onClick={onAdd}
      >
        <PlusCircle size={20} />
        Ajouter
      </button>
    </div>
  );
}