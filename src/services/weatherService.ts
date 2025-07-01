// src/services/weatherService.ts

import type { WeatherData } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;
// Change the endpoint to 'forecast.json'
const API_URL = 'https://api.weatherapi.com/v1/forecast.json';

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  // Add the 'days=3' parameter to get a 3-day forecast
  const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}&days=3`);

  if (!response.ok) {
    throw new Error('Weather data not found');
  }

  const data: WeatherData = await response.json();
  return data;
};