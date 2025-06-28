import React from 'react';

export default function TaskFilters({ filter, setFilter }) {
  return (
    <div className="flex justify-center gap-3 mb-4">
      <button
        className={`px-3 py-1 rounded ${
          filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
        onClick={() => setFilter('all')}
      >
        Toutes
      </button>
      <button
        className={`px-3 py-1 rounded ${
          filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
        onClick={() => setFilter('active')}
      >
        Actives
      </button>
      <button
        className={`px-3 py-1 rounded ${
          filter === 'done' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
        onClick={() => setFilter('done')}
      >
        Terminées
      </button>
    </div>
  );
}