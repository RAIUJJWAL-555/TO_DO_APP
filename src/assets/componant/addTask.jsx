import { useState, useEffect } from 'react';
import "./addTask.css"
import Completed from './completed';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from API on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      const tasks = await response.json();
      const incompleteTasks = tasks.filter(task => !task.isDone);
      const completedTasks = tasks.filter(task => task.isDone);
      setTodos(incompleteTasks);
      setCompleted(completedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskText) => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: taskText, isDone: false }),
      });
      const newTask = await response.json();
      setTodos([...todos, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const completeTask = async (id) => {
    try {
      const task = todos.find(t => t._id === id);
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isDone: true }),
      });
      const updatedTask = await response.json();
      setTodos(todos.filter(t => t._id !== id));
      setCompleted([...completed, updatedTask]);
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const uncompleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isDone: false }),
      });
      const updatedTask = await response.json();
      setCompleted(completed.filter(t => t._id !== id));
      setTodos([...todos, updatedTask]);
    } catch (error) {
      console.error('Error uncompleting task:', error);
    }
  };

  const handleAdd = () => {
    if (todo.trim() === '') return;
    addTask(todo);
    setTodo('');
  };

  const handleDelete = (id) => {
    deleteTask(id);
  };

  const handleCheck = (id) => {
    completeTask(id);
  };


  return (
    <div className=" main-box   bg-gradient-to-r from-purple-100 to-blue-100 p-4">
      <div className="bg-gray-50 shadow-xl  rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <p className=" p1 text-center text-gray-800"> 🗒️ Todo App  🗒️</p>


        <div className="input-container ">
          <input
            type="text"
            className="input-box flex  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder='Enter a task'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="add-btn  text-white px-4 py-2 focus:outline-none rounded-r-lg "
          >
            Add
          </button>
        </div>

        <ul className=" space-y-2 flex-col  items-center justify-evenly ">
          {loading ? (
            <p className="text-gray-600 text-center">Loading tasks...</p>
          ) : (
            todos.map((item) => (

            <li
            key={item._id}
            className="task-list "
           >
            <div className="flex items-center gap-2">
              {/* ✅ [CHANGE] Checkbox added */}
              <input className='cheakbox'
                type="checkbox"
                onChange={() => handleCheck(item._id)}
              />
              <span className="text-gray-800 font-medium">{item.text}</span>
            </div>

            <button
              onClick={() => handleDelete(item._id)}
              className="task-list-btn"
            >
              Delete
            </button>
           </li>

            ))
          )}
        </ul>

        {todos.length === 0 && !loading && (
          <p className="text-gray-500 text-center font-medium">No tasks yet!</p>
        )}
      </div>
      {/* ✅ [CHANGE] Completed tasks section added */}
      <Completed onUncomplete={uncompleteTask} />
    </div>
  );
}

export default App;
