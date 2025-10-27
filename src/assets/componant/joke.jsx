import { useState } from "react";
import './Home.css'

function Joke() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);

  const getJoke = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");
      const data = await res.json();
      setJoke(data);
    } catch (err) {
      console.error("Error fetching joke:", err);
      setJoke({ setup: "Oops!", punchline: "Failed to load joke 😢" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-yellow-100 to-pink-100 p-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">😂 Joke Generator</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl text-center">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : joke ? (
          <>
            <p className="text-lg font-semibold text-gray-800">{joke.setup}</p>
            <p className="mt-2 text-md text-gray-600">{joke.punchline}</p>
          </>
        ) : (
          <p className="text-gray-500">Click the button to get a joke!</p>
        )}

        <button
          onClick={getJoke}
          className="quote-btn"
        >
          Get Joke
        </button>
      </div>
    </div>
  );
}

export default Joke;
