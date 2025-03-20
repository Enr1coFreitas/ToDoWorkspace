import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DailyGif.css';

const DailyGif = () => {
  const [gifData, setGifData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDailyGif();
  }, []);

  const fetchDailyGif = async () => {
    try {
      const response = await axios.get('/api/daily-gif');
      setGifData(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load daily GIF');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="daily-gif-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="daily-gif-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="gif-wrapper">
        <img 
          src={gifData.url} 
          alt={gifData.title}
          className="gif-image"
        />
      </div>
  );
}

export default DailyGif;

