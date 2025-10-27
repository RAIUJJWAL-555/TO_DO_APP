import React, { useState, useEffect } from 'react';
import './addTask.css';

function Completed({ completed = [], onUncomplete }) {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      const tasks = await response.json();
      const completedTasksData = tasks.filter(task => task.isDone);
      setCompletedTasks(completedTasksData);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUncomplete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isDone: false }),
      });
      if (response.ok) {
        setCompletedTasks(completedTasks.filter(task => task._id !== id));
        if (onUncomplete) onUncomplete(id);
      }
    } catch (error) {
      console.error('Error uncompleting task:', error);
    }
  };

  return (
    <div className="com-main-box p-8">
      <h2 className="text-3xl font-bold text-gray-700 mb-8 drop-shadow-lg text-center">🎉 Completed Tasks 🎉</h2>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="text-white text-lg ml-4">Loading completed tasks...</p>
        </div>
      ) : completedTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-white/80 text-xl">No completed tasks yet. Keep it up! 🚀</p>
          <p className="text-white/60 text-sm mt-2">Complete some tasks to see them here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {completedTasks.map((task, index) => (
            <div
              key={task._id}
              className="completed-list p-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <span className="text-white text-xl line-through font-medium">{task.text}</span>
                  <div className="flex items-center mt-2">
                    <span className="text-green-300 text-sm mr-2">✓</span>
                    <p className="text-white/70 text-sm">
                      Completed: {new Date(task.createdAt).toLocaleDateString()} at {new Date(task.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleUncomplete(task._id)}
                  className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                >
                  ↺ Mark Incomplete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Completed;

