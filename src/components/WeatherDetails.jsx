import { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherDetails({ searchQuery, onBack }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=d22e4a88098d4b739b951627242504&q=${searchQuery}&days=3&aqi=no`
        );
        setWeather(response.data.current);
        setForecast(response.data.forecast.forecastday);
        setLocation(response.data.location);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data. Please check your input and try again.');
        setLoading(false);
      }
    };

    fetchWeather();
  }, [searchQuery]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-xl font-semibold">Loading weather data...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-xl font-semibold text-red-500">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {location.name}, {location.country}
          </h1>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to Search
          </button>
        </div>

        {/* Current Weather */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Current Weather</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-600">Temperature</p>
              <p className="text-3xl font-bold">{weather.temp_c}°C</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-600">Humidity</p>
              <p className="text-3xl font-bold">{weather.humidity}%</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-600">Wind</p>
              <p className="text-3xl font-bold">{weather.wind_kph} km/h</p>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">3-Day Forecast</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {forecast.map((day) => (
              <div key={day.date} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold mb-2">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
                <div className="space-y-2">
                  <p>Max: {day.day.maxtemp_c}°C</p>
                  <p>Min: {day.day.mintemp_c}°C</p>
                  <p>Humidity: {day.day.avghumidity}%</p>
                  <p>Wind: {day.day.maxwind_kph} km/h</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;