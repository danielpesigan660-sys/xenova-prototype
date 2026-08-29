import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FiMapPin, FiWind, FiDroplets, FiEye, FiGauge } from 'react-icons/fi';
import axios from 'axios';

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  feelsLike: number;
  icon: string;
}

const WeatherDashboard = () => {
  const [location, setLocation] = useState('Manila');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchWeather(location);
  }, []);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );

      const data = response.data;
      setWeather({
        city: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        visibility: data.visibility / 1000,
        pressure: data.main.pressure,
        feelsLike: Math.round(data.main.feels_like),
        icon: data.weather[0].icon,
      });
      setLocation(city);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch weather data');
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

  return (
    <ScrollView className="flex-1 bg-gradient-to-br from-blue-400 to-blue-600">
      {/* Header */}
      <View className="px-4 py-6">
        <Text className="text-white text-3xl font-bold mb-6">⛅ Weather Dashboard</Text>

        {/* Search Bar */}
        <View className="flex-row gap-2 mb-6">
          <TextInput
            placeholder="Search city..."
            value={searchInput}
            onChangeText={setSearchInput}
            className="flex-1 bg-white rounded-lg px-4 py-3"
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            onPress={handleSearch}
            className="bg-white rounded-lg px-4 py-3 justify-center"
          >
            <Text className="font-semibold text-blue-600">Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {loading ? (
        <View className="flex-1 justify-center items-center py-12">
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : weather ? (
        <View className="px-4 pb-8">
          {/* Current Weather Card */}
          <View className="bg-white/20 backdrop-blur rounded-3xl p-8 mb-6 border border-white/30">
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <FiMapPin className="text-white mr-2" />
                  <Text className="text-white text-xl font-semibold">{weather.city}</Text>
                </View>
                <Text className="text-blue-100 text-sm">{weather.description}</Text>
              </View>
              <Text className="text-white text-6xl font-bold">{weather.temperature}°C</Text>
            </View>

            <Text className="text-blue-100 text-lg mb-4">
              Feels like <Text className="text-white font-semibold">{weather.feelsLike}°C</Text>
            </Text>
          </View>

          {/* Weather Details Grid */}
          <View className="grid grid-cols-2 gap-4">
            <WeatherDetailCard
              icon="💧"
              label="Humidity"
              value={`${weather.humidity}%`}
            />
            <WeatherDetailCard
              icon="💨"
              label="Wind Speed"
              value={`${weather.windSpeed} m/s`}
            />
            <WeatherDetailCard
              icon="👁️"
              label="Visibility"
              value={`${weather.visibility.toFixed(1)} km`}
            />
            <WeatherDetailCard
              icon="🔽"
              label="Pressure"
              value={`${weather.pressure} hPa`}
            />
          </View>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-center">Failed to load weather data</Text>
        </View>
      )}
    </ScrollView>
  );
};

const WeatherDetailCard = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
    <Text className="text-3xl mb-2">{icon}</Text>
    <Text className="text-blue-100 text-sm mb-1">{label}</Text>
    <Text className="text-white text-xl font-bold">{value}</Text>
  </View>
);

export default WeatherDashboard;
