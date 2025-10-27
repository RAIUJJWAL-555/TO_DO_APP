
import React, { useState, useEffect } from 'react';
import './inbox.css';

function Inbox() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      const tasks = await response.json();
      const incompleteTasks = tasks.filter(task => !task.isDone);
      setTodos(incompleteTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inbox-content">
      <div className='div1'>
        <h2 className="text-3xl font-bold mb-6">📋 Your Tasks</h2>
        {loading ? (
          <p className="text-white text-lg">Loading tasks...</p>
        ) : todos.length === 0 ? (
          <p className="text-white text-lg">No pending tasks! 🎉</p>
        ) : (
          <div className="space-y-4">
            {todos.map((task) => (
              <div key={task._id} className="task-item bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <p className="text-white text-lg">{task.text}</p>
                <p className="text-white/70 text-sm mt-2">
                  Added: {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Inbox;

