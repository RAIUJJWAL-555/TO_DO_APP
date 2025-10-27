import { useState } from 'react';
import "./addTask.css"
import Completed from './completed';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);

  const handleAdd = () => {
    if (todo.trim() === '') return;
    setTodos([...todos,{ text: todo, isDone: false }]);
    setTodo('');
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };
  const handleCheck = (index) => {
    const updated = [...todos];
    const completedTask = updated.splice(index, 1)[0];
    completedTask.isDone = true;
    setTodos(updated);
    setCompleted([...completed, completedTask]);
  };


  return (
    <div className=" main-box   bg-gradient-to-r from-yellow-100 to-pink-100 p-4">
      <div className="bg-white shadow-xl  rounded-2xl p-8 w-full max-w-md ">
        <p className=" p1 text-center text-blue-600"> 🗒️ Todo App  🗒️</p>
        

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
          {todos.map((item, index) => (
          
          <li
          key={index}
          className="task-list "
         >
          <div className="flex items-center gap-2">
            {/* ✅ [CHANGE] Checkbox added */}
            <input className='cheakbox'
              type="checkbox"
              onChange={() => handleCheck(index)}
            />
            <span>{item.text}</span>
          </div>

          <button
            onClick={() => handleDelete(index)}
            className="task-list-btn"
          >
            Delete
          </button>
         </li>
            
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-gray-400 text-center ">No tasks yet!</p>
        )}
      </div>
      {/* ✅ [CHANGE] Completed tasks section added */}
      <Completed completed={completed} />
    </div>
  );
}

export default App;
