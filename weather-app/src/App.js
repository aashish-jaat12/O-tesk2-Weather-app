import React, { useState, useEffect } from 'react';
import axios from 'axios';


const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState('');
  const API_KEY = '6f421986b2ad889b428646e10d715873'; // replace with your OpenWeather API key

  // Fetch Weather Data
  const fetchWeather = async (cityName) => {
  

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const datas = await response.data
      setWeather(datas);
      console.log(datas)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  // Fetch Current Time
  const updateTime = () => {
    const date = new Date();
    setTime(date.toLocaleTimeString());
  };

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Change background color based on weather
  const getBackgroundColor = () => {
    if (!weather) return '#fff'; // default color
    const weatherMain = weather.weather[0].main;
    switch (weatherMain) {
      case 'Clear':
        return '#87CEEB'; // sunny
      case 'Clouds':
        return '#B0C4DE'; // cloudy
      case 'Rain':
        return '#778899'; // rainy
      case 'Snow':
        return '#F0FFFF'; // snowy
      default:
        return '#fff';
    }
  };

  return (
    <div className="app" style={{ backgroundColor: getBackgroundColor() }}>
      <div className="container">
        <h1>Weather App</h1>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>{time}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather-icon"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
