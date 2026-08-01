import { useState } from 'react';
import './weather-app.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (city.trim() === '') return;

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>

      <div className="search-row">
        <input
          className="search-input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city"
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && <p className="status-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {weatherData && (
    <div className="weather-card">
    <p className="city-name">{weatherData.name}</p>
    <img
      className="weather-icon"
      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
      alt={weatherData.weather[0].description}
    />
    <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
    <p className="condition">{weatherData.weather[0].description}</p>
  </div>
      )}
    </div>
  );
};

export default WeatherApp;