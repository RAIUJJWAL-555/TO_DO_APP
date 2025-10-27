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
    <div className=' quote-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
    <div className=" text-black p-10 rounded-xl shadow-xl max-w-xl text-center">
      <p className="text-xl text-black-200 ">"{quote.quote}"</p>
      <p className="mt-4 font-bold text-blue-400">- {quote.author || 'Unknown'}</p>
      <button
        onClick={fetchQuote}
        className="quote-btn"
      >
        New Quote
      </button>
    </div>
    </div>
  );
};

export default Quote;
