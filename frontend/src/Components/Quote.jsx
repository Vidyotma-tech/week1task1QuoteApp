import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/quote.css'

function Home() {
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://api.quotable.io/random', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuote(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch quote');
    }
  };

  const fetchQuotesByAuthor = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://api.quotable.io/quotes?author=${author}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.results.length === 0) {
        alert('No quotes found for the specified author');
        setAuthor('');
      } else {
        setQuotes(response.data.results);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch quotes');
    }
  };

  return (
    <div id='quote-page'>
      <div className="quote-container">
        <h1>Quote of the Day</h1>
        {quote && (
          <div className="quote-box">
            <p className="quote-content">"{quote.content}"</p>
            <p className="quote-author">~ {quote.author}</p>
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={fetchRandomQuote} className="quote-button">Get Another Quote</button>
        <div className="search-container">
          <h2>Search Quotes by Author</h2>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author name"
            className="search-input"
          />
          <button onClick={fetchQuotesByAuthor} className="search-button">Search</button>
          {quotes.map((q) => (
            <div key={q._id} className="quote-box">
              <p className="quote-content">"{q.content}"</p>
              <p className="quote-author">- {q.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
