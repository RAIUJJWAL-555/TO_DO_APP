import { useState } from "react";
import './home.css'

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-12 drop-shadow-lg text-center">😂 Joke Generator</h1>

      <div className="bg-white/90 backdrop-blur-lg p-12 rounded-3xl shadow-2xl w-full max-w-2xl text-center border border-purple-200/50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-6 left-6 text-6xl opacity-10 text-purple-300">😄</div>
        <div className="absolute bottom-6 right-6 text-6xl opacity-10 text-pink-300 rotate-12">🤣</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-5 text-indigo-200">🎭</div>

        {loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mb-6"></div>
            <p className="text-gray-700 text-xl font-medium">Loading hilarious joke...</p>
          </div>
        ) : joke ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-2xl font-bold text-gray-800 leading-relaxed italic">"{joke.setup}"</p>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto"></div>
              <p className="text-xl text-gray-700 font-medium leading-relaxed">{joke.punchline}</p>
            </div>

            <div className="flex justify-center space-x-2 mt-8">
              <span className="text-2xl">🎪</span>
              <span className="text-2xl">🎭</span>
              <span className="text-2xl">🎨</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-6xl mb-4">🎪</div>
            <p className="text-gray-600 text-xl font-medium">Ready for some laughs?</p>
            <p className="text-gray-500 text-lg">Click the button to generate a joke!</p>
          </div>
        )}

        <button
          onClick={getJoke}
          className="mt-10 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-3xl relative overflow-hidden group text-lg"
        >
          <span className="relative z-10 flex items-center">
            <span className="mr-3 text-xl">🎭</span>
            {loading ? 'Loading...' : 'Get New Joke'}
            <span className="ml-3 text-xl">🎭</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  );
}

export default Joke;
