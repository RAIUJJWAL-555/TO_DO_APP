import React from 'react'
import './addTask.css'

function Completed({ completed = [] }) {
  return (
    <div className="com-main-box  shadow-md rounded-xl max-w-md  ">
      <h2 className="mx-5 text-xl font-semibold text-green-700 mb-4">✔️ Completed Tasks ✔️</h2>

      {completed.length === 0 ? (
        <p className="text-gray-400">No completed tasks yet.</p>
      ) : (
        <ul className="space-y-2">
          {completed.map((task, index) => (
            <li
              key={index}
              className="completed-list bg-white px-4 py-2  text-green-700 line-through"
            >
              {task.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Completed;

