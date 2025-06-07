import React from 'react';
import TaskApp from './components/TaskApp';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        TaskZen 🧘‍♂️
      </h1>
      <TaskApp />
    </div>
  );
}

export default App;