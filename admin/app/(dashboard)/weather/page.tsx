'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiSearch, FiMapPin, FiDroplets, FiWind, FiEye, FiTrendingUp } from 'react-icons/fi';
import axios from 'axios';

interface CurrentWeather {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  clouds: {
    all: number;
  };
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
    }>;
    wind: {
      speed: number;
    };
  }>;
}

export default function WeatherDashboard() {
  const [city, setCity] = useState('Manila');
  const [searchInput, setSearchInput] = useState('');
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || 'demo';

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = async (searchCity: string) => {
    setLoading(true);
    setError('');
    try {
      // Current weather
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: searchCity,
            appid: API_KEY,
            units: 'metric',
          },
        }
      );

      setWeather(weatherResponse.data);
      setCity(weatherResponse.data.name);

      // Forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
        {
          params: {
            q: searchCity,
            appid: API_KEY,
            units: 'metric',
          },
        }
      );

      // Process forecast data for chart
      const processedData = forecastResponse.data.list
        .filter((_: any, index: number) => index % 8 === 0) // Get daily data
        .map((item: any) => ({
          date: new Date(item.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          temp: Math.round(item.main.temp),
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
          description: item.weather[0].main,
        }));

      setForecast(processedData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      fetchWeather(searchInput);
      setSearchInput('');
    }
  };

  const WeatherIcon = ({ icon }: { icon: string }) => {
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    return (
      <img
        src={iconUrl}
        alt="weather"
        className="w-32 h-32 object-contain"
      />
    );
  };

  return (
    <div>
      <Header title="Weather Dashboard" />

      <div className="p-8">
        {/* Search */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Search city..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="input-field flex-1 max-w-md"
          />
          <button onClick={handleSearch} className="btn-primary flex items-center gap-2">
            <FiSearch /> Search
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading weather data...</div>
        ) : weather ? (
          <>
            {/* Current Weather Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-8 mb-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FiMapPin className="text-2xl" />
                    <h2 className="text-4xl font-bold">{weather.name}</h2>
                  </div>
                  <p className="text-blue-100 text-lg mb-6 capitalize">
                    {weather.weather[0].description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-100">Temperature</span>
                      <span className="font-bold text-2xl">{Math.round(weather.main.temp)}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-100">Feels Like</span>
                      <span className="font-bold text-xl">{Math.round(weather.main.feels_like)}°C</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <WeatherIcon icon={weather.weather[0].icon} />
                  <p className="text-blue-100 capitalize text-lg">{weather.weather[0].main}</p>
                </div>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DetailCard
                icon={<FiDroplets className="text-2xl text-blue-600" />}
                label="Humidity"
                value={`${weather.main.humidity}%`}
              />
              <DetailCard
                icon={<FiWind className="text-2xl text-cyan-600" />}
                label="Wind Speed"
                value={`${weather.wind.speed} m/s`}
              />
              <DetailCard
                icon={<FiEye className="text-2xl text-purple-600" />}
                label="Visibility"
                value={`${(weather.visibility / 1000).toFixed(1)} km`}
              />
              <DetailCard
                icon={<FiTrendingUp className="text-2xl text-orange-600" />}
                label="Pressure"
                value={`${weather.main.pressure} hPa`}
              />
            </div>

            {/* Forecast Chart */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-6">5-Day Forecast</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Temperature Trend</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={forecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="temp"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ fill: '#2563eb', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Humidity & Wind</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={forecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="humidity" fill="#06b6d4" name="Humidity (%)" />
                      <Bar dataKey="windSpeed" fill="#f59e0b" name="Wind (m/s)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-600">
            Search for a city to see weather information
          </div>
        )}
      </div>
    </div>
  );
}

const DetailCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="card flex items-center gap-4">
    <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
    <div>
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);
