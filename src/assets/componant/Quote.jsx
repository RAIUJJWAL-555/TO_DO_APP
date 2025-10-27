import React, { useState, useEffect } from 'react';
import './Home.css'
const Quote = () => {
  const [quote, setQuote] = useState({ quote: '', author: '' });

  const fetchQuote = async () => {
    try {
      const res = await fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: {
          'X-Api-Key': '/nHx5bo61Ze3H8ckHVZQcw==7Akt24Mea6KqOrRq'
        }
      });

      const data = await res.json();
      if (data.length > 0) {
        setQuote(data[0]);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className='quote-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl'>
      <div className="text-gray-800 p-16 rounded-3xl shadow-2xl text-center backdrop-blur-md bg-gradient-to-br from-purple-100/80 to-blue-100/80 border border-purple-200/50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 text-4xl opacity-30 text-purple-300">"</div>
        <div className="absolute bottom-4 right-4 text-4xl opacity-30 text-purple-300 rotate-180">"</div>

        {/* Loading state */}
        {!quote.quote && !quote.author ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mb-6"></div>
            <p className="text-gray-700 text-xl">Loading inspirational quote...</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-3xl md:text-4xl text-gray-800 mb-8 drop-shadow-lg font-light italic leading-relaxed">"{quote.quote}"</p>
              <div className="flex items-center justify-center">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mr-4"></div>
                <p className="text-xl font-semibold text-gray-700 drop-shadow-md">- {quote.author || 'Unknown'}</p>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent ml-4"></div>
              </div>
            </div>

            <button
              onClick={fetchQuote}
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-3xl relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-2">✨</span>
                New Quote
                <span className="ml-2">✨</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Quote;
